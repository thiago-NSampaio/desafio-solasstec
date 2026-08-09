import { Injectable } from '@nestjs/common/decorators';

import { PrismaService } from '../prisma.service';
import { VisitorRepository } from '../../../../app/repositories/visitor-repository';
import { Visitor } from '../../../../app/entities/visitor';
import { PrismaVisitorMapper } from '../mappers/prisma-visitor-mapper';

@Injectable()
export class PrismaVisitorRepository implements VisitorRepository {
  constructor(private prismaService: PrismaService) {}

  async create(visitor: Visitor): Promise<void> {
    const raw = PrismaVisitorMapper.toPrisma(visitor);

    await this.prismaService.visitor.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Visitor | null> {
    const raw = await this.prismaService.visitor.findUnique({
      where: { id },
    });

    if (!raw) {
      return null;
    }

    return PrismaVisitorMapper.toDomain(raw);
  }

  async findMany(): Promise<Visitor[]> {
    const visitors = await this.prismaService.visitor.findMany();

    return visitors.map(PrismaVisitorMapper.toDomain);
  }
}
