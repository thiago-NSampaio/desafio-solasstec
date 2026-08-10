import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateScheduling } from '../../../app/use-cases/create-scheduling';
import { GetScheduling } from '../../../app/use-cases/get-scheduling';
import { GetSchedulings } from '../../../app/use-cases/get-schedulings';
import { CreateSchedulingBody } from '../dtos/create-scheduling-body';
import { SchedulingPresenter } from '../presenters/scheduling-presenter';

@Controller('/schedulings')
export class SchedulingController {
  constructor(
    private createScheduling: CreateScheduling,
    private getScheduling: GetScheduling,
    private getSchedulings: GetSchedulings,
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
      scheduling: scheduling ? SchedulingPresenter.toHTTP(scheduling) : null,
    };
  }

  @Get()
  async findMany(
    @Query('visitorId') visitorId?: string,
    @Query('roomId') roomId?: string,
  ) {
    const { schedulings } = await this.getSchedulings.execute({
      visitorId,
      roomId,
    });

    return {
      schedulings: schedulings.map((scheduling) =>
        SchedulingPresenter.toHTTP(scheduling),
      ),
    };
  }
}
