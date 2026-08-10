import { Injectable } from '@nestjs/common';
import { ResponsibleRoom } from '../entities/responsible-room';
import { ResponsibleRoomRepository } from '../repositories/responsible-room-repository';

interface CreateResponsibleRoomRequest {
  name: string;
  roomId: string;
  validFrom: Date;
}

interface CreateResponsibleRoomResponse {
  responsibleRoom: ResponsibleRoom;
}

@Injectable()
export class CreateResponsibleRoom {
  constructor(private responsibleRoomRepository: ResponsibleRoomRepository) {}

  async execute(
    request: CreateResponsibleRoomRequest,
  ): Promise<CreateResponsibleRoomResponse> {
    const { name, roomId, validFrom } = request;

    await this.responsibleRoomRepository.closePreviousResponsible(
      roomId,
      validFrom,
    );

    const responsibleRoom = new ResponsibleRoom(name, roomId, validFrom);

    const created =
      await this.responsibleRoomRepository.create(responsibleRoom);

    return { responsibleRoom: created };
  }
}
