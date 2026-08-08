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
}
