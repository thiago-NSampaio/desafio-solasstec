import { Scheduling } from '../../../app/entities/scheduling';

export class SchedulingPresenter {
  static toHTTP(scheduling: Scheduling) {
    return {
      visitorId: scheduling.visitorId,
      roomId: scheduling.roomId ?? null,
      dateScheduled: scheduling.dateScheduled,
    };
  }
}
