import { Injectable } from '@nestjs/common';
import { Scheduling } from '../entities/scheduling';
import { SchedulingRepository } from '../repositories/scheduling-repository';

interface GetSchedulingsRequest {
  visitorId?: string;
  roomId?: string;
}

interface GetSchedulingsResponse {
  schedulings: Scheduling[];
}

@Injectable()
export class GetSchedulings {
  constructor(private schedulingRepository: SchedulingRepository) {}

  async execute(
    request?: GetSchedulingsRequest,
  ): Promise<GetSchedulingsResponse> {
    const schedulings = await this.schedulingRepository.findMany({
      visitorId: request?.visitorId,
      roomId: request?.roomId,
    });

    return { schedulings };
  }
}
