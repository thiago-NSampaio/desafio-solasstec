import { Visitor } from '../entities/visitor';

export abstract class VisitorRepository {
  abstract create(visitor: Visitor): Promise<void>;
}
