import { Visitor as PrismaVisitor } from '@prisma/client';
import { Visitor } from '../../../../app/entities/visitor';

export class PrismaVisitorMapper {
  static toPrisma(visitor: Visitor) {
    return {
      id: visitor.id,
      name: visitor.name,
      document: visitor.document,
      dateOfBirth: visitor.dateOfBirth,
      photo: visitor.photo,
      priorityLevelId: visitor.priorityLevelId,
      active: visitor.active,
      createdAt: visitor.createdAt ?? undefined,
    };
  }

  static toDomain(raw: PrismaVisitor): Visitor {
    return new Visitor(
      raw.name,
      raw.document,
      raw.dateOfBirth,
      raw.photo,
      raw.priorityLevelId,
      raw.active,
      raw.createdAt,
      raw.id,
    );
  }
}
