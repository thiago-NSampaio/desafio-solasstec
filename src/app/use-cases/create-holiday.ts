import { Injectable } from '@nestjs/common';
import { Holiday } from '../entities/holiday';
import { HolidayRepository } from '../repositories/holiday-repository';

interface CreateHolidayRequest {
  date: Date;
  description: string;
  type?: number | null;
}

interface CreateHolidayResponse {
  holiday: Holiday;
}

@Injectable()
export class CreateHoliday {
  constructor(private holidayRepository: HolidayRepository) {}

  async execute(request: CreateHolidayRequest): Promise<CreateHolidayResponse> {
    const { date, description, type } = request;

    const holiday = new Holiday(date, description, type);

    const createdHoliday = await this.holidayRepository.create(holiday);

    return { holiday: createdHoliday };
  }
}
