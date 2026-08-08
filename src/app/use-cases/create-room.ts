import { Injectable } from '@nestjs/common/decorators';
import { Availability, Room } from '../entities/room';
import { RoomRepository } from '../repositories/room-repository';

interface CreateRoomRequest {
  name: string;
  availability: Availability[];
  capacity: number;
  capacityVariation: number | null;
}

interface CreateRoomResponse {
  room: Room;
}

@Injectable()
export class CreateRoom {
  constructor(private roomRepository: RoomRepository) {}

  async execute(request: CreateRoomRequest): Promise<CreateRoomResponse> {
    const { name, availability, capacity, capacityVariation } = request;

    const room = new Room(name, availability, capacity, capacityVariation);

    await this.roomRepository.create(room);

    return { room };
  }
}
