import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import {
  SchedulingFilters,
  SchedulingRepository,
} from '../../../../app/repositories/scheduling-repository';
import { Scheduling } from '../../../../app/entities/scheduling';
import { PrismaSchedulingMapper } from '../mappers/prisma-scheduling-mapper';

@Injectable()
export class PrismaSchedulingRepository implements SchedulingRepository {
  constructor(private prismaService: PrismaService) {}

  async create(scheduling: Scheduling): Promise<Scheduling> {
    const raw = PrismaSchedulingMapper.toPrisma(scheduling);

    const created = await this.prismaService.scheduling.create({
      data: raw,
      include: {
        visitor: true,
        room: true,
      },
    });

    return PrismaSchedulingMapper.toDomain(created);
  }

  async findById(id: string): Promise<Scheduling | null> {
    const raw = await this.prismaService.scheduling.findUnique({
      where: { id },
      include: {
        visitor: true,
        room: true,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaSchedulingMapper.toDomain(raw);
  }

  async findMany(filters?: SchedulingFilters): Promise<Scheduling[]> {
    const whereFilter: Prisma.SchedulingWhereInput = {};

    if (filters && filters.visitorId) {
      whereFilter.visitorId = filters.visitorId;
    }

    if (filters && filters.roomId) {
      whereFilter.roomId = filters.roomId;
    }

    const raw = await this.prismaService.scheduling.findMany({
      where: whereFilter,
      include: {
        visitor: true,
        room: true,
      },
      orderBy: {
        dateScheduled: 'desc',
      },
    });

    return raw.map((scheduling) => PrismaSchedulingMapper.toDomain(scheduling));
  }

  async update(scheduling: Scheduling): Promise<Scheduling> {
    const raw = PrismaSchedulingMapper.toPrisma(scheduling);

    const updated = await this.prismaService.scheduling.update({
      where: { id: scheduling.id },
      data: {
        dateScheduled: raw.dateScheduled,
        roomId: raw.roomId,
        active: raw.active,
      },
      include: {
        visitor: true,
        room: true,
      },
    });

    return PrismaSchedulingMapper.toDomain(updated);
  }

  async countByRoomAndDate(
    roomId: string,
    date: Date,
    excludeSchedulingId?: string,
  ): Promise<number> {
    const startOfMinute = new Date(date);
    startOfMinute.setSeconds(0, 0);

    const endOfMinute = new Date(date);
    endOfMinute.setSeconds(59, 999);

    const where: Prisma.SchedulingWhereInput = {
      roomId,
      dateScheduled: {
        gte: startOfMinute,
        lte: endOfMinute,
      },
      active: true,
    };

    if (excludeSchedulingId) {
      where.id = { not: excludeSchedulingId };
    }

    return await this.prismaService.scheduling.count({ where });
  }

  async findVisitorSchedulingAtDate(
    visitorId: string,
    date: Date,
    excludeSchedulingId?: string,
  ): Promise<Scheduling | null> {
    const startOfMinute = new Date(date);
    startOfMinute.setSeconds(0, 0);

    const endOfMinute = new Date(date);
    endOfMinute.setSeconds(59, 999);

    const where: Prisma.SchedulingWhereInput = {
      visitorId,
      dateScheduled: {
        gte: startOfMinute,
        lte: endOfMinute,
      },
      active: true,
    };

    if (excludeSchedulingId) {
      where.id = { not: excludeSchedulingId };
    }

    const raw = await this.prismaService.scheduling.findFirst({
      where,
      include: {
        visitor: true,
        room: true,
      },
    });

    if (!raw) return null;
    return PrismaSchedulingMapper.toDomain(raw);
  }
}

