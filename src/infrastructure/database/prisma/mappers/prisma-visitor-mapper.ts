import { Visitor as PrismaVisitor } from '@prisma/client';
import { Visitor } from '../../../../app/entities/visitor';

export class PrismaVisitorMapper {
  static toPrisma(visitor: Visitor) {
    return {
      name: visitor.name,
      document: visitor.document,
      dateOfBirth: visitor.dateOfBirth,
      photo: visitor.photo,
      priorityLevelId: visitor.priorityLevelId,
    };
  }

  static toDomain(raw: PrismaVisitor): Visitor {
    return new Visitor(
      raw.name,
      raw.document,
      raw.dateOfBirth,
      raw.photo,
      raw.priorityLevelId,
    );
  }
}
