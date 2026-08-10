import { ResponsibleRoom } from '../../../app/entities/responsible-room';
import { RoomPresenter } from './room-presenter';

export class ResponsibleRoomPresenter {
  static toHTTP(responsibleRoom: ResponsibleRoom) {
    return {
      id: responsibleRoom.id,
      name: responsibleRoom.name,
      roomId: responsibleRoom.roomId,
      validFrom: responsibleRoom.validFrom,
      validTo: responsibleRoom.validTo,
      active: responsibleRoom.active,
      createdAt: responsibleRoom.createdAt,
      room: responsibleRoom.room
        ? RoomPresenter.toHTTP(responsibleRoom.room)
        : null,
    };
  }
}
