import { Scheduling as PrismaScheduling } from '@prisma/client';
import { Scheduling } from '../../../../app/entities/scheduling';

export class PrismaSchedulingMapper {
  static toPrisma(scheduling: Scheduling) {
    return {
      visitorId: scheduling.visitorId,
      roomId: scheduling.roomId,
      dateScheduled: scheduling.dateScheduled,
    };
  }

  static toDomain(raw: PrismaScheduling): Scheduling {
    return new Scheduling(raw.visitorId, raw.dateScheduled, raw.roomId);
  }
}
