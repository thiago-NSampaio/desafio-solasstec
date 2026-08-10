import { Scheduling } from '../entities/scheduling';

export interface SchedulingFilters {
  visitorId?: string;
  roomId?: string;
}

export abstract class SchedulingRepository {
  abstract create(scheduling: Scheduling): Promise<Scheduling>;
  abstract findById(id: string): Promise<Scheduling | null>;
  abstract findMany(filters?: SchedulingFilters): Promise<Scheduling[]>;
  abstract countByRoomAndDate(roomId: string, date: Date): Promise<number>;
  abstract findVisitorSchedulingAtDate(
    visitorId: string,
    date: Date,
  ): Promise<Scheduling | null>;
}
