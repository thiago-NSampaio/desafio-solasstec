import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateResponsibleRoom } from '../../../app/use-cases/create-responsible-room';
import { GetRoomResponsibles } from '../../../app/use-cases/get-room-responsibles';
import { CreateResponsibleRoomBody } from '../dtos/create-responsible-room-body';
import { ResponsibleRoomPresenter } from '../presenters/responsible-room-presenter';

@Controller('/rooms')
export class ResponsibleRoomController {
  constructor(
    private createResponsibleRoom: CreateResponsibleRoom,
    private getRoomResponsibles: GetRoomResponsibles,
  ) {}

  @Post(':id/responsibles')
  async create(
    @Param('id') roomId: string,
    @Body() body: Omit<CreateResponsibleRoomBody, 'roomId'>,
  ) {
    const { name, validFrom } = body;

    const { responsibleRoom } = await this.createResponsibleRoom.execute({
      name,
      roomId,
      validFrom: new Date(validFrom),
    });

    return {
      responsible: ResponsibleRoomPresenter.toHTTP(responsibleRoom),
    };
  }

  @Get(':id/responsibles')
  async findManyByRoomId(@Param('id') roomId: string) {
    const { responsibles } = await this.getRoomResponsibles.execute({ roomId });

    return {
      responsibles: responsibles.map((responsible) =>
        ResponsibleRoomPresenter.toHTTP(responsible),
      ),
    };
  }
}
