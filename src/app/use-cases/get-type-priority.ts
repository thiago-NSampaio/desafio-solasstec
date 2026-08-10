import { Injectable, NotFoundException } from '@nestjs/common';
import { TypePriority } from '../entities/type-priority';
import { TypePriorityRepository } from '../repositories/type-priority-repository';

interface GetTypePriorityRequest {
  typePriorityId: string;
}

interface GetTypePriorityResponse {
  typePriority: TypePriority;
}

@Injectable()
export class GetTypePriority {
  constructor(private typePriorityRepository: TypePriorityRepository) {}

  async execute(
    request: GetTypePriorityRequest,
  ): Promise<GetTypePriorityResponse> {
    const { typePriorityId } = request;

    const typePriority =
      await this.typePriorityRepository.findById(typePriorityId);

    if (!typePriority) {
      throw new NotFoundException('Tipo de prioridade não encontrado.');
    }

    return { typePriority };
  }
}
