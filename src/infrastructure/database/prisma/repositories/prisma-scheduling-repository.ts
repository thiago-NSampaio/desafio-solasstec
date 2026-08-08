import { Injectable } from '@nestjs/common/decorators';

import { PrismaService } from '../prisma.service';
import { SchedulingRepository } from '../../../../app/repositories/scheduling-repository';
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

  async findByIdWithRelations(id: string): Promise<Scheduling | null> {
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
}
