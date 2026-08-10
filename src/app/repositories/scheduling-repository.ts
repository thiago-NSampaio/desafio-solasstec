import { Scheduling } from '../entities/scheduling';

export interface SchedulingFilters {
  visitorId?: string;
  roomId?: string;
}

export abstract class SchedulingRepository {
  abstract create(scheduling: Scheduling): Promise<Scheduling>;
  abstract findById(id: string): Promise<Scheduling | null>;
  abstract findMany(filters?: SchedulingFilters): Promise<Scheduling[]>;
  abstract countByRoomAndDate(
    roomId: string,
    date: Date,
    excludeSchedulingId?: string,
  ): Promise<number>;
  abstract findVisitorSchedulingAtDate(
    visitorId: string,
    date: Date,
    excludeSchedulingId?: string,
  ): Promise<Scheduling | null>;
  abstract update(scheduling: Scheduling): Promise<Scheduling>;
}

