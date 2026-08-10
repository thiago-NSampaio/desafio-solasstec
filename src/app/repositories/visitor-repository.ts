import { Visitor } from '../entities/visitor';

export abstract class VisitorRepository {
  abstract create(visitor: Visitor): Promise<Visitor>;
  abstract findById(id: string): Promise<Visitor | null>;
  abstract findByDocument(document: string): Promise<Visitor | null>;
  abstract findMany(): Promise<Visitor[]>;
}
