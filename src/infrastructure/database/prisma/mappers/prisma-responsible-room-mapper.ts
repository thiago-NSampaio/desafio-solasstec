import {
  ResponsibleRoom as PrismaResponsibleRoom,
  Room as PrismaRoom,
} from '@prisma/client';
import { ResponsibleRoom } from '../../../../app/entities/responsible-room';
import { PrismaRoomMapper } from './prisma-room-mapper';

type RawResponsibleWithRoom = PrismaResponsibleRoom & {
  room?: PrismaRoom | null;
};

export class PrismaResponsibleRoomMapper {
  static toDomain(raw: RawResponsibleWithRoom): ResponsibleRoom {
    return new ResponsibleRoom(
      raw.name,
      raw.roomId,
      raw.validFrom,
      raw.validTo,
      raw.active,
      raw.createdAt,
      raw.room ? PrismaRoomMapper.toDomain(raw.room) : null,
      raw.id,
    );
  }

  static toPrisma(responsibleRoom: ResponsibleRoom) {
    return {
      id: responsibleRoom.id,
      name: responsibleRoom.name,
      roomId: responsibleRoom.roomId,
      validFrom: responsibleRoom.validFrom,
      validTo: responsibleRoom.validTo,
      active: responsibleRoom.active,
      createdAt: responsibleRoom.createdAt || new Date(),
    };
  }
}
