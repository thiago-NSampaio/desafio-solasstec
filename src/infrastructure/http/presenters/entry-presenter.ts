import { Entry } from '../../../app/entities/entry';

export class EntryPresenter {
  static toHTTP(entry: Entry) {
    return {
      id: entry.id,
      visitorId: entry.visitorId,
      roomId: entry.roomId,
      schedulingId: entry.schedulingId,
      enteredAt: entry.enteredAt,
      exitedAt: entry.exitedAt,
      visitor: entry.visitor
        ? {
            id: entry.visitor.id,
            name: entry.visitor.name,
            document: entry.visitor.document,
          }
        : null,
      room: entry.room
        ? {
            id: entry.room.id,
            name: entry.room.name,
          }
        : null,
      scheduling: entry.scheduling
        ? {
            id: entry.scheduling.id,
            dateScheduled: entry.scheduling.dateScheduled,
          }
        : null,
    };
  }
}
