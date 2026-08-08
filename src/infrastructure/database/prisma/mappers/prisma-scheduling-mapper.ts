import { Prisma, Scheduling as PrismaScheduling } from '@prisma/client';
import { Scheduling } from '../../../../app/entities/scheduling';
import { PrismaVisitorMapper } from './prisma-visitor-mapper';
import { PrismaRoomMapper } from './prisma-room-mapper';

export type SchedulingWithRelations = Prisma.SchedulingGetPayload<{
  include: {
    visitor: true;
    room: true;
  };
}>;

export class PrismaSchedulingMapper {
  static toPrisma(scheduling: Scheduling) {
    return {
      id: scheduling.id,
      visitorId: scheduling.visitorId,
      roomId: scheduling.roomId || null,
      dateScheduled: scheduling.dateScheduled,
    };
  }

  static toDomain(raw: SchedulingWithRelations | PrismaScheduling): Scheduling {
    const visitor =
      'visitor' in raw && raw.visitor
        ? PrismaVisitorMapper.toDomain(raw.visitor)
        : null;

    const room =
      'room' in raw && raw.room ? PrismaRoomMapper.toDomain(raw.room) : null;

    return new Scheduling(
      raw.visitorId,
      raw.dateScheduled,
      raw.roomId,
      visitor,
      room,
      raw.id,
    );
  }
}
