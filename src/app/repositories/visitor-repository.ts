import { Visitor } from '../entities/visitor';

export abstract class VisitorRepository {
  abstract create(visitor: Visitor): Promise<void>;
  abstract findById(id: string): Promise<Visitor | null>;
  abstract findMany(): Promise<Visitor[]>;
}
