import { Scheduling } from '../entities/scheduling';

export abstract class SchedulingRepository {
  abstract create(scheduling: Scheduling): Promise<void>;
}
