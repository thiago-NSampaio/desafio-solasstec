import { Room } from '../../../app/entities/room';

export class RoomPresenter {
  static toHTTP(room: Room) {
    return {
      id: room.id,
      name: room.name,
      availability: room.availability,
      capacity: room.capacity,
      capacityVariation: room.capacityVariation ?? null,
    };
  }
}
