import { Injectable, BadRequestException } from '@nestjs/common';
import { Scheduling } from '../entities/scheduling';
import { SchedulingRepository } from '../repositories/scheduling-repository';
import { VisitorRepository } from '../repositories/visitor-repository';
import { RoomRepository } from '../repositories/room-repository';
import { HolidayRepository } from '../repositories/holiday-repository';
import { Room } from '../entities/room';

interface CreateSchedulingRequest {
  visitorId: string;
  dateScheduled: Date;
  roomId: string | null;
}

interface CreateSchedulingResponse {
  scheduling: Scheduling;
}

export class InvalidSchedulingException extends BadRequestException {
  public suggestedDate?: string;

  constructor(message: string, suggestedDate?: Date) {
    super({
      statusCode: 400,
      message,
      suggestedDate: suggestedDate ? suggestedDate.toISOString() : undefined,
    });
    this.suggestedDate = suggestedDate
      ? suggestedDate.toISOString()
      : undefined;
  }
}

const DAY_MAP: Record<number, string[]> = {
  0: ['domingo', 'sunday', '0'],
  1: ['segunda', 'segunda-feira', 'monday', '1'],
  2: ['terça', 'terça-feira', 'terca', 'terca-feira', 'tuesday', '2'],
  3: ['quarta', 'quarta-feira', 'wednesday', '3'],
  4: ['quinta', 'quinta-feira', 'thursday', '4'],
  5: ['sexta', 'sexta-feira', 'friday', '5'],
  6: ['sábado', 'sabado', 'saturday', '6'],
};

@Injectable()
export class CreateScheduling {
  constructor(
    private schedulingRepository: SchedulingRepository,
    private visitorRepository: VisitorRepository,
    private roomRepository: RoomRepository,
    private holidayRepository: HolidayRepository,
  ) {}

  private isRoomOpenAt(room: Room, date: Date): boolean {
    if (!room.availability || room.availability.length === 0) return true;

    const dayIndex = date.getDay();
    const validNames = DAY_MAP[dayIndex] || [];

    const avail = room.availability.find((a) =>
      a.days.some((d) => {
        const dayName = d.toLowerCase().trim();
        return validNames.some(
          (vn) => dayName.includes(vn) || vn.includes(dayName),
        );
      }),
    );

    if (!avail) return false;

    const [openH, openM] = avail.openTime.split(':').map(Number);
    const [closeH, closeM] = avail.closeTime.split(':').map(Number);

    const dateMinutes = date.getHours() * 60 + date.getMinutes();
    const openMinutes = openH * 60 + (openM || 0);
    const closeMinutes = closeH * 60 + (closeM || 0);

    return dateMinutes >= openMinutes && dateMinutes <= closeMinutes;
  }


  private async suggestNextAvailableDate(
    visitorId: string,
    roomId: string | null,
    fromDate: Date,
  ): Promise<Date | undefined> {
    const now = new Date();
    let start = new Date(fromDate.getTime());
    if (start < now) {
      start = new Date(now.getTime() + 15 * 60 * 1000);
    }

    let room: Room | null = null;
    if (roomId) {
      room = await this.roomRepository.findById(roomId);
    }

    for (let step = 1; step <= 14 * 24 * 2; step++) {
      const candidate = new Date(start.getTime() + step * 30 * 60 * 1000);
      candidate.setSeconds(0, 0);

      const holiday = await this.holidayRepository.findByDate(candidate);
      if (holiday) continue;

      const visitorConflict =
        await this.schedulingRepository.findVisitorSchedulingAtDate(
          visitorId,
          candidate,
        );
      if (visitorConflict) continue;

      if (room) {
        if (!room.active) continue;
        if (!this.isRoomOpenAt(room, candidate)) continue;

        const count = await this.schedulingRepository.countByRoomAndDate(
          room.id,
          candidate,
        );
        if (count >= room.capacity) continue;
      }

      return candidate;
    }

    return undefined;
  }

  async execute(
    request: CreateSchedulingRequest,
  ): Promise<CreateSchedulingResponse> {
    const { visitorId, dateScheduled, roomId } = request;

    const visitor = await this.visitorRepository.findById(visitorId);
    if (!visitor) {
      throw new InvalidSchedulingException('Visitante não encontrado.');
    }
    if (visitor.active === false) {
      throw new InvalidSchedulingException('Visitante inativo no sistema.');
    }

    let room: Room | null = null;
    if (roomId) {
      room = await this.roomRepository.findById(roomId);
      if (!room) {
        throw new InvalidSchedulingException('Sala não encontrada.');
      }
      if (room.active === false) {
        const suggested = await this.suggestNextAvailableDate(
          visitorId,
          roomId,
          dateScheduled,
        );
        throw new InvalidSchedulingException(
          'A sala selecionada está inativa no sistema.',
          suggested,
        );
      }
    }

    const holiday = await this.holidayRepository.findByDate(dateScheduled);
    if (holiday) {
      const suggested = await this.suggestNextAvailableDate(
        visitorId,
        roomId,
        dateScheduled,
      );
      throw new InvalidSchedulingException(
        `Não é possível agendar nesta data pois é feriado (${holiday.description}).`,
        suggested,
      );
    }

    const existingVisitorScheduling =
      await this.schedulingRepository.findVisitorSchedulingAtDate(
        visitorId,
        dateScheduled,
      );
    if (existingVisitorScheduling) {
      const suggested = await this.suggestNextAvailableDate(
        visitorId,
        roomId,
        dateScheduled,
      );
      throw new InvalidSchedulingException(
        'O visitante já possui outro agendamento neste mesmo horário.',
        suggested,
      );
    }

    if (room) {
      const isOpen = this.isRoomOpenAt(room, dateScheduled);
      if (!isOpen) {
        const suggested = await this.suggestNextAvailableDate(
          visitorId,
          roomId,
          dateScheduled,
        );
        throw new InvalidSchedulingException(
          'O horário selecionado está fora do expediente de funcionamento da sala.',
          suggested,
        );
      }

      const scheduledCount = await this.schedulingRepository.countByRoomAndDate(
        room.id,
        dateScheduled,
      );
      if (scheduledCount >= room.capacity) {
        const suggested = await this.suggestNextAvailableDate(
          visitorId,
          roomId,
          dateScheduled,
        );
        throw new InvalidSchedulingException(
          'A sala já atingiu a capacidade máxima de agendamentos para este horário.',
          suggested,
        );
      }
    }

    const scheduling = new Scheduling(visitorId, dateScheduled, roomId);
    const createdScheduling =
      await this.schedulingRepository.create(scheduling);

    return { scheduling: createdScheduling };
  }
}
