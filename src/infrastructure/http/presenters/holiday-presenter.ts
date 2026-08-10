import { Holiday } from '../../../app/entities/holiday';

export class HolidayPresenter {
  static toHTTP(holiday: Holiday) {
    return {
      id: holiday.id,
      date: holiday.date,
      description: holiday.description,
      type: holiday.type,
      active: holiday.active,
      createdAt: holiday.createdAt,
    };
  }
}
