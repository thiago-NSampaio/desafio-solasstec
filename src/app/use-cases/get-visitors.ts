import { Injectable } from '@nestjs/common';
import { Visitor } from '../entities/visitor';
import { VisitorRepository } from '../repositories/visitor-repository';

interface GetVisitorsResponse {
  visitors: Visitor[];
}

@Injectable()
export class GetVisitors {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute(): Promise<GetVisitorsResponse> {
    const visitors = await this.visitorRepository.findMany();

    return { visitors };
  }
}
