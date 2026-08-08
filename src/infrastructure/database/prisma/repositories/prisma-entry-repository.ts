import { Injectable } from '@nestjs/common/decorators';

import { PrismaService } from '../prisma.service';
import { EntryRepository } from '../../../../app/repositories/entry-repository';
import { Entry } from '../../../../app/entities/entry';
import { PrismaEntryMapper } from '../mappers/prisma-entry-mapper';

@Injectable()
export class PrismaEntryRepository implements EntryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(entry: Entry): Promise<Entry> {
    const raw = PrismaEntryMapper.toPrisma(entry);

    const created = await this.prismaService.entry.create({
      data: raw,
      include: {
        visitor: true,
        room: true,
        scheduling: true,
      },
    });

    return PrismaEntryMapper.toDomain(created);
  }

  async findByIdWithRelations(id: string): Promise<Entry | null> {
    const raw = await this.prismaService.entry.findUnique({
      where: { id },
      include: {
        visitor: true,
        room: true,
        scheduling: true,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaEntryMapper.toDomain(raw);
  }
}
