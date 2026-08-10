import { Injectable } from '@nestjs/common';
import { TypePriority } from '../entities/type-priority';
import { TypePriorityRepository } from '../repositories/type-priority-repository';

interface GetTypePrioritiesResponse {
  typePriorities: TypePriority[];
}

@Injectable()
export class GetTypePriorities {
  constructor(private typePriorityRepository: TypePriorityRepository) {}

  async execute(): Promise<GetTypePrioritiesResponse> {
    const typePriorities = await this.typePriorityRepository.findMany();

    return { typePriorities };
  }
}
