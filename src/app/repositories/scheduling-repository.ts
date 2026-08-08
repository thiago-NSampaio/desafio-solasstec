import { Scheduling } from '../entities/scheduling';

export abstract class SchedulingRepository {
  abstract create(scheduling: Scheduling): Promise<Scheduling>;
  abstract findByIdWithRelations(id: string): Promise<Scheduling | null>;
}
