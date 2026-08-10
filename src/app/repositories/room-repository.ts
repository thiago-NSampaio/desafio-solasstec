import { Room } from '../entities/room';

export abstract class RoomRepository {
  abstract create(room: Room, responsibleName?: string): Promise<void>;
  abstract findById(id: string): Promise<Room | null>;
  abstract findMany(): Promise<Room[]>;
}

