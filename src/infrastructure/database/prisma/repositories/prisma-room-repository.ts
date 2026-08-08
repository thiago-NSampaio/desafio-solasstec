import { Injectable } from '@nestjs/common/decorators';

import { PrismaService } from '../prisma.service';
import { RoomRepository } from '../../../../app/repositories/room-repository';
import { Room } from '../../../../app/entities/room';
import { PrismaRoomMapper } from '../mappers/prisma-room-mapper';

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private prismaService: PrismaService) {}

  async create(room: Room): Promise<void> {
    const raw = PrismaRoomMapper.toPrisma(room);

    await this.prismaService.room.create({
      data: raw,
    });
  }
}
