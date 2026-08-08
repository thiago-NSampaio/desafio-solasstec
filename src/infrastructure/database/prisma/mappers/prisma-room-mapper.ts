import { Room as PrismaRoom, Prisma } from '@prisma/client';
import { Availability, Room } from '../../../../app/entities/room';

export class PrismaRoomMapper {
  static toPrisma(room: Room) {
    return {
      name: room.name,
      availability: room.availability as unknown as Prisma.InputJsonValue,
      capacity: room.capacity,
      capacityVariation: room.capacityVariation,
    };
  }

  static toDomain(raw: PrismaRoom): Room {
    return new Room(
      raw.name,
      raw.availability as unknown as Availability[],
      raw.capacity,
      raw.capacityVariation,
    );
  }
}
