import { Body, Controller, Post } from '@nestjs/common';
import { CreateScheduling } from '../../../app/use-cases/create-scheduling';
import { CreateSchedulingBody } from '../dtos/create-scheduling-body';
import { SchedulingPresenter } from '../presenters/scheduling-presenter';

@Controller('/schedulings')
export class SchedulingController {
  constructor(private createScheduling: CreateScheduling) {}

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
}
