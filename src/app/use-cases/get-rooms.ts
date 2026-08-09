import { Injectable } from '@nestjs/common';
import { Room } from '../entities/room';
import { RoomRepository } from '../repositories/room-repository';

interface GetRoomsResponse {
  rooms: Room[];
}

@Injectable()
export class GetRooms {
  constructor(private roomRepository: RoomRepository) {}

  async execute(): Promise<GetRoomsResponse> {
    const rooms = await this.roomRepository.findMany();

    return { rooms };
  }
}
