import { Visitor } from '../../src/app/entities/visitor';
import { VisitorRepository } from '../../src/app/repositories/visitor-repository';

export class InMemoryVisitorRepository implements VisitorRepository {
  public items: Visitor[] = [];

  async create(visitor: Visitor): Promise<void> {
    this.items.push(visitor);
  }

  async findById(id: string): Promise<Visitor | null> {
    const visitor = this.items.find((item) => item.id === id);

    if (!visitor) {
      return null;
    }

    return visitor;
  }

  async findMany(): Promise<Visitor[]> {
    return this.items;
  }
}
