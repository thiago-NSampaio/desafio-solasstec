import { Entry } from '../entities/entry';

export abstract class EntryRepository {
  abstract create(entry: Entry): Promise<Entry>;
  abstract findByIdWithRelations(id: string): Promise<Entry | null>;
}
