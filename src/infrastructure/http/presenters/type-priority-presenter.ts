import { TypePriority } from '../../../app/entities/type-priority';

export class TypePriorityPresenter {
  static toHTTP(typePriority: TypePriority) {
    return {
      id: typePriority.id,
      description: typePriority.description,
      priorityLevel: typePriority.priorityLevel,
      active: typePriority.active,
      createdAt: typePriority.createdAt,
    };
  }
}
