import { Injectable, NotFoundException } from '@nestjs/common';
import { Scheduling } from '../entities/scheduling';
import { SchedulingRepository } from '../repositories/scheduling-repository';

interface GetSchedulingRequest {
  schedulingId: string;
}

interface GetSchedulingResponse {
  scheduling: Scheduling;
}

@Injectable()
export class GetScheduling {
  constructor(private schedulingRepository: SchedulingRepository) {}

  async execute(request: GetSchedulingRequest): Promise<GetSchedulingResponse> {
    const { schedulingId } = request;

    const scheduling =
      await this.schedulingRepository.findByIdWithRelations(schedulingId);

    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return { scheduling };
  }
}
