import { Injectable } from '@nestjs/common';
import { ResponsibleRoom } from '../../../../app/entities/responsible-room';
import { ResponsibleRoomRepository } from '../../../../app/repositories/responsible-room-repository';
import { PrismaService } from '../prisma.service';
import { PrismaResponsibleRoomMapper } from '../mappers/prisma-responsible-room-mapper';

@Injectable()
export class PrismaResponsibleRoomRepository implements ResponsibleRoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(responsibleRoom: ResponsibleRoom): Promise<ResponsibleRoom> {
    const raw = PrismaResponsibleRoomMapper.toPrisma(responsibleRoom);
    const created = await this.prisma.responsibleRoom.create({
      data: raw,
      include: { room: true },
    });
    return PrismaResponsibleRoomMapper.toDomain(created);
  }

  async findManyByRoomId(roomId: string): Promise<ResponsibleRoom[]> {
    const responsiblesRoom = await this.prisma.responsibleRoom.findMany({
      where: { roomId },
      orderBy: { validFrom: 'desc' },
      include: { room: true },
    });

    return responsiblesRoom.map((responsibleRoom) =>
      PrismaResponsibleRoomMapper.toDomain(responsibleRoom),
    );
  }

  async findCurrentByRoomId(roomId: string): Promise<ResponsibleRoom | null> {
    const responsibleRoom = await this.prisma.responsibleRoom.findFirst({
      where: { roomId, validTo: null, active: true },
      orderBy: { validFrom: 'desc' },
      include: { room: true },
    });

    if (!responsibleRoom) return null;
    return PrismaResponsibleRoomMapper.toDomain(responsibleRoom);
  }

  async closePreviousResponsible(roomId: string, validTo: Date): Promise<void> {
    await this.prisma.responsibleRoom.updateMany({
      where: { roomId, validTo: null },
      data: { validTo },
    });
  }
}
