import { Injectable } from '@nestjs/common/decorators';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../prisma.service';
import { RoomRepository } from '../../../../app/repositories/room-repository';
import { Room } from '../../../../app/entities/room';
import { PrismaRoomMapper } from '../mappers/prisma-room-mapper';

const includeCurrentResponsible = {
  responsiblesRooms: {
    where: { active: true as const },
    orderBy: { validFrom: 'desc' as const },
    take: 1,
  },
};

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private prismaService: PrismaService) {}

  async create(room: Room, responsibleName?: string): Promise<void> {
    const raw = PrismaRoomMapper.toPrisma(room);

    if (responsibleName) {
      await this.prismaService.room.create({
        data: {
          ...raw,
          responsiblesRooms: {
            create: {
              id: randomUUID(),
              name: responsibleName,
              validFrom: new Date(),
            },
          },
        },
      });
    } else {
      await this.prismaService.room.create({ data: raw });
    }
  }

  async findById(id: string): Promise<Room | null> {
    const raw = await this.prismaService.room.findUnique({
      where: { id },
      include: includeCurrentResponsible,
    });

    if (!raw) {
      return null;
    }

    return PrismaRoomMapper.toDomain(raw);
  }

  async findMany(): Promise<Room[]> {
    const rooms = await this.prismaService.room.findMany({
      include: includeCurrentResponsible,
    });

    return rooms.map(PrismaRoomMapper.toDomain);
  }
}
