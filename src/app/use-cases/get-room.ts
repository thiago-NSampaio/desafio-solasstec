import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from '../entities/room';
import { RoomRepository } from '../repositories/room-repository';

interface GetRoomRequest {
  roomId: string;
}

interface GetRoomResponse {
  room: Room;
}

@Injectable()
export class GetRoom {
  constructor(private roomRepository: RoomRepository) {}

  async execute(request: GetRoomRequest): Promise<GetRoomResponse> {
    const { roomId } = request;

    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new NotFoundException('Sala não encontrada.');
    }

    return { room };
  }
}
