import { Room as PrismaRoom, ResponsibleRoom as PrismaResponsibleRoom, Prisma } from '@prisma/client';
import { Availability, Room } from '../../../../app/entities/room';

type PrismaRoomWithResponsible = PrismaRoom & {
  responsiblesRooms?: PrismaResponsibleRoom[];
};
export class PrismaRoomMapper {
  static toPrisma(room: Room) {
    return {
      id: room.id,
      name: room.name,
      availability: room.availability as unknown as Prisma.InputJsonValue,
      capacity: room.capacity,
      capacityVariation: room.capacityVariation,
      active: room.active,
      createdAt: room.createdAt ?? undefined,
    };
  }

  static toDomain(raw: PrismaRoomWithResponsible): Room {
    return new Room(
      raw.name,
      raw.availability as unknown as Availability[],
      raw.capacity,
      raw.capacityVariation,
      raw.active,
      raw.createdAt,
      raw.id,
      raw.responsiblesRooms?.[0]?.name ?? null,
    );
  }
}
