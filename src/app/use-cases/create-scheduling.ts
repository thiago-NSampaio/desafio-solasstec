import { Injectable } from '@nestjs/common/decorators';
import { Scheduling } from '../entities/scheduling';
import { SchedulingRepository } from '../repositories/scheduling-repository';

interface CreateSchedulingRequest {
  visitorId: string;
  dateScheduled: Date;
  roomId: string | null;
}

interface CreateSchedulingResponse {
  scheduling: Scheduling;
}

@Injectable()
export class CreateScheduling {
  constructor(private schedulingRepository: SchedulingRepository) {}

  async execute(
    request: CreateSchedulingRequest,
  ): Promise<CreateSchedulingResponse> {
    const { visitorId, dateScheduled, roomId } = request;

    const scheduling = new Scheduling(visitorId, dateScheduled, roomId);

    const createdScheduling =
      await this.schedulingRepository.create(scheduling);

    return { scheduling: createdScheduling };
  }
}
