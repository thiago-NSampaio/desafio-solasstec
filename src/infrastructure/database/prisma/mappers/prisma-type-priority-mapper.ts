import { TypePriority as PrismaTypePriority } from '@prisma/client';
import { TypePriority } from '../../../../app/entities/type-priority';

export class PrismaTypePriorityMapper {
  static toDomain(raw: PrismaTypePriority): TypePriority {
    return new TypePriority(
      raw.description,
      raw.priorityLevel,
      raw.active,
      raw.createdAt,
      raw.id,
    );
  }

  static toPrisma(typePriority: TypePriority) {
    return {
      id: typePriority.id,
      description: typePriority.description,
      priorityLevel: typePriority.priorityLevel,
      active: typePriority.active,
      createdAt: typePriority.createdAt || new Date(),
    };
  }
}
