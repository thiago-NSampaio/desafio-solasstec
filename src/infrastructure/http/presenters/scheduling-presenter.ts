import { Scheduling } from '../../../app/entities/scheduling';

export class SchedulingPresenter {
  static toHTTP(scheduling: Scheduling) {
    return {
      id: scheduling.id,
      visitorId: scheduling.visitorId,
      roomId: scheduling.roomId,
      dateScheduled: scheduling.dateScheduled,
      endTime: scheduling.endTime,
      active: scheduling.active,
      createdAt: scheduling.createdAt,
      visitor: scheduling.visitor
        ? {
            id: scheduling.visitor.id,
            name: scheduling.visitor.name,
            document: scheduling.visitor.document,
          }
        : null,
      room: scheduling.room
        ? {
            id: scheduling.room.id,
            name: scheduling.room.name,
          }
        : null,
    };
  }
}
