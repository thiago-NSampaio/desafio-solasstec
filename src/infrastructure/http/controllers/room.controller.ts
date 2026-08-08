import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoom } from '../../../app/use-cases/create-room';
import { CreateRoomBody } from '../dtos/create-room-body';
import { RoomPresenter } from '../presenters/room-presenter';

@Controller('/rooms')
export class RoomController {
  constructor(private createRoom: CreateRoom) {}

  @Post()
  async create(@Body() body: CreateRoomBody) {
    const { name, availability, capacity, capacityVariation } = body;

    const { room } = await this.createRoom.execute({
      name,
      availability,
      capacity,
      capacityVariation: capacityVariation ?? null,
    });

    return {
      room: RoomPresenter.toHTTP(room),
    };
  }
}
