import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from '../prisma.service';
import { VisitorRepository } from '../../../../app/repositories/visitor-repository';
import { Visitor } from '../../../../app/entities/visitor';
import { PrismaVisitorMapper } from '../mappers/prisma-visitor-mapper';

@Injectable()
export class PrismaVisitorRepository implements VisitorRepository {
  constructor(private prismaService: PrismaService) {}

  async create(visitor: Visitor): Promise<Visitor> {
    const raw = PrismaVisitorMapper.toPrisma(visitor);

    const created = await this.prismaService.visitor.create({
      data: raw,
    });

    return PrismaVisitorMapper.toDomain(created);
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

  async findByDocument(document: string): Promise<Visitor | null> {
    const cleanDoc = document.replace(/\D/g, '');
    const visitors = await this.prismaService.visitor.findMany();

    const match = visitors.find(
      (v) => v.document.replace(/\D/g, '') === cleanDoc,
    );

    if (!match) return null;
    return PrismaVisitorMapper.toDomain(match);
  }

  async findMany(): Promise<Visitor[]> {
    const visitors = await this.prismaService.visitor.findMany({
      orderBy: { name: 'asc' },
    });

    return visitors.map((visitor) => PrismaVisitorMapper.toDomain(visitor));
  }
}
