import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScheduling } from '../../../app/use-cases/create-scheduling';
import { GetScheduling } from '../../../app/use-cases/get-scheduling';
import { CreateSchedulingBody } from '../dtos/create-scheduling-body';
import { SchedulingPresenter } from '../presenters/scheduling-presenter';

@Controller('/schedulings')
export class SchedulingController {
  constructor(
    private createScheduling: CreateScheduling,
    private getScheduling: GetScheduling,
  ) {}

  @Post()
  async create(@Body() body: CreateSchedulingBody) {
    const { visitorId, dateScheduled, roomId } = body;

    const { scheduling } = await this.createScheduling.execute({
      visitorId,
      dateScheduled: new Date(dateScheduled),
      roomId: roomId ?? null,
    });

    return {
      scheduling: SchedulingPresenter.toHTTP(scheduling),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { scheduling } = await this.getScheduling.execute({
      schedulingId: id,
    });

    return {
      scheduling: SchedulingPresenter.toHTTP(scheduling),
    };
  }
}
