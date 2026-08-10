import { Injectable } from '@nestjs/common';
import { Holiday } from '../entities/holiday';
import { HolidayRepository } from '../repositories/holiday-repository';

interface GetHolidaysResponse {
  holidays: Holiday[];
}

@Injectable()
export class GetHolidays {
  constructor(private holidayRepository: HolidayRepository) {}

  async execute(): Promise<GetHolidaysResponse> {
    const holidays = await this.holidayRepository.findMany();

    return { holidays };
  }
}
