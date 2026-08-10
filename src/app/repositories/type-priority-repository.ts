import { TypePriority } from '../entities/type-priority';

export abstract class TypePriorityRepository {
  abstract findById(id: string): Promise<TypePriority | null>;
  abstract findMany(): Promise<TypePriority[]>;
}
