import { Holiday as PrismaHoliday } from '@prisma/client';
import { Holiday } from '../../../../app/entities/holiday';

export class PrismaHolidayMapper {
  static toDomain(raw: PrismaHoliday): Holiday {
    return new Holiday(
      raw.date,
      raw.description,
      raw.type,
      raw.active,
      raw.createdAt,
      raw.id,
    );
  }

  static toPrisma(holiday: Holiday) {
    return {
      id: holiday.id,
      date: holiday.date,
      description: holiday.description,
      type: holiday.type,
      active: holiday.active,
      createdAt: holiday.createdAt || new Date(),
    };
  }
}
