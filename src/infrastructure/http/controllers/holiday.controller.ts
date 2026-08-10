import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHoliday } from '../../../app/use-cases/create-holiday';
import { GetHolidays } from '../../../app/use-cases/get-holidays';
import { CreateHolidayBody } from '../dtos/create-holiday-body';
import { HolidayPresenter } from '../presenters/holiday-presenter';

@Controller('/holidays')
export class HolidayController {
  constructor(
    private createHoliday: CreateHoliday,
    private getHolidays: GetHolidays,
  ) {}

  @Post()
  async create(@Body() body: CreateHolidayBody) {
    const { date, description, type } = body;

    const { holiday } = await this.createHoliday.execute({
      date: new Date(date),
      description,
      type,
    });

    return {
      holiday: HolidayPresenter.toHTTP(holiday),
    };
  }

  @Get()
  async findMany() {
    const { holidays } = await this.getHolidays.execute();

    return {
      holidays: holidays.map((holiday) => HolidayPresenter.toHTTP(holiday)),
    };
  }
}
