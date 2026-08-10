import { Holiday } from '../entities/holiday';

export abstract class HolidayRepository {
  abstract create(holiday: Holiday): Promise<Holiday>;
  abstract findById(id: string): Promise<Holiday | null>;
  abstract findByDate(date: Date): Promise<Holiday | null>;
  abstract findMany(): Promise<Holiday[]>;
}
