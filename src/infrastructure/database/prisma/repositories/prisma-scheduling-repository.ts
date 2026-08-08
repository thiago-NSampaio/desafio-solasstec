import { Injectable } from '@nestjs/common/decorators';

import { PrismaService } from '../prisma.service';
import { SchedulingRepository } from '../../../../app/repositories/scheduling-repository';
import { Scheduling } from '../../../../app/entities/scheduling';
import { PrismaSchedulingMapper } from '../mappers/prisma-scheduling-mapper';

@Injectable()
export class PrismaSchedulingRepository implements SchedulingRepository {
  constructor(private prismaService: PrismaService) {}

  async create(scheduling: Scheduling): Promise<void> {
    const raw = PrismaSchedulingMapper.toPrisma(scheduling);

    await this.prismaService.scheduling.create({
      data: raw,
    });
  }
}
