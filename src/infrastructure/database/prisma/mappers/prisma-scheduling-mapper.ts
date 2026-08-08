import { Prisma } from '@prisma/client';
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
      roomId: scheduling.roomId,
      dateScheduled: scheduling.dateScheduled,
    };
  }

  static toDomain(raw: SchedulingWithRelations): Scheduling {
    return new Scheduling(
      raw.visitorId,
      raw.dateScheduled,
      raw.roomId,
      raw.visitor ? PrismaVisitorMapper.toDomain(raw.visitor) : null,
      raw.room ? PrismaRoomMapper.toDomain(raw.room) : null,
      raw.id,
    );
  }
}
