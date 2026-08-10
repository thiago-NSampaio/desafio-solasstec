import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TypePriorityRepository } from '../../../../app/repositories/type-priority-repository';
import { TypePriority } from '../../../../app/entities/type-priority';
import { PrismaTypePriorityMapper } from '../mappers/prisma-type-priority-mapper';

@Injectable()
export class PrismaTypePriorityRepository implements TypePriorityRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<TypePriority | null> {
    const raw = await this.prismaService.typePriority.findUnique({
      where: { id },
    });

    if (!raw) {
      return null;
    }

    return PrismaTypePriorityMapper.toDomain(raw);
  }

  async findMany(): Promise<TypePriority[]> {
    const typePriorities = await this.prismaService.typePriority.findMany();

    return typePriorities.map(PrismaTypePriorityMapper.toDomain);
  }
}
