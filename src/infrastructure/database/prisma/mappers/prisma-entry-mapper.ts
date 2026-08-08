import { Prisma, Entry as PrismaEntry } from '@prisma/client';
import { Entry } from '../../../../app/entities/entry';
import { PrismaVisitorMapper } from './prisma-visitor-mapper';
import { PrismaRoomMapper } from './prisma-room-mapper';
import { PrismaSchedulingMapper } from './prisma-scheduling-mapper';

export type EntryWithRelations = Prisma.EntryGetPayload<{
  include: {
    visitor: true;
    room: true;
    scheduling: true;
  };
}>;

export class PrismaEntryMapper {
  static toPrisma(entry: Entry) {
    return {
      id: entry.id,
      visitorId: entry.visitorId,
      roomId: entry.roomId,
      schedulingId: entry.schedulingId,
      enteredAt: entry.enteredAt,
      exitedAt: entry.exitedAt,
      active: entry.active,
      createdAt: entry.createdAt,
    };
  }

  static toDomain(raw: EntryWithRelations | PrismaEntry): Entry {
    const visitor =
      'visitor' in raw && raw.visitor
        ? PrismaVisitorMapper.toDomain(raw.visitor)
        : null;

    const room =
      'room' in raw && raw.room ? PrismaRoomMapper.toDomain(raw.room) : null;

    const scheduling =
      'scheduling' in raw && raw.scheduling
        ? PrismaSchedulingMapper.toDomain(raw.scheduling)
        : null;

    return new Entry(
      raw.visitorId,
      raw.roomId,
      raw.schedulingId,
      raw.enteredAt,
      raw.exitedAt,
      raw.active,
      raw.createdAt,
      visitor,
      room,
      scheduling,
      raw.id,
    );
  }
}
