import { Injectable } from '@nestjs/common';
import { Holiday } from '../../../../app/entities/holiday';
import { HolidayRepository } from '../../../../app/repositories/holiday-repository';
import { PrismaService } from '../prisma.service';
import { PrismaHolidayMapper } from '../mappers/prisma-holiday-mapper';

@Injectable()
export class PrismaHolidayRepository implements HolidayRepository {
  constructor(private prisma: PrismaService) {}

  async create(holiday: Holiday): Promise<Holiday> {
    const raw = PrismaHolidayMapper.toPrisma(holiday);
    const created = await this.prisma.holiday.create({
      data: raw,
    });
    return PrismaHolidayMapper.toDomain(created);
  }

  async findById(id: string): Promise<Holiday | null> {
    const holiday = await this.prisma.holiday.findUnique({
      where: { id },
    });

    if (!holiday) return null;
    return PrismaHolidayMapper.toDomain(holiday);
  }

  async findByDate(date: Date): Promise<Holiday | null> {
    const d = new Date(date);

    const startUTC = new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0),
    );
    const endUTC = new Date(
      Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const startLocal = new Date(d);
    startLocal.setHours(0, 0, 0, 0);
    const endLocal = new Date(d);
    endLocal.setHours(23, 59, 59, 999);

    const gte = startUTC < startLocal ? startUTC : startLocal;
    const lte = endUTC > endLocal ? endUTC : endLocal;

    const holiday = await this.prisma.holiday.findFirst({
      where: {
        date: {
          gte,
          lte,
        },
        active: true,
      },
    });

    if (!holiday) return null;
    return PrismaHolidayMapper.toDomain(holiday);
  }

  async findMany(): Promise<Holiday[]> {
    const holidays = await this.prisma.holiday.findMany({
      orderBy: { date: 'asc' },
    });

    return holidays.map((holiday) => PrismaHolidayMapper.toDomain(holiday));
  }
}
