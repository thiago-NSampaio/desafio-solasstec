import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoom } from '../../../app/use-cases/create-room';
import { GetRoom } from '../../../app/use-cases/get-room';
import { GetRooms } from '../../../app/use-cases/get-rooms';
import { CreateRoomBody } from '../dtos/create-room-body';
import { RoomPresenter } from '../presenters/room-presenter';

@Controller('/rooms')
export class RoomController {
  constructor(
    private createRoom: CreateRoom,
    private getRoom: GetRoom,
    private getRooms: GetRooms,
  ) {}

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

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { room } = await this.getRoom.execute({
      roomId: id,
    });

    return {
      room: RoomPresenter.toHTTP(room),
    };
  }

  @Get()
  async findMany() {
    const { rooms } = await this.getRooms.execute();

    return {
      rooms: rooms.map(RoomPresenter.toHTTP),
    };
  }
}
