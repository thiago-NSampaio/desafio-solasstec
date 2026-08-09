import { Injectable, NotFoundException } from '@nestjs/common';
import { Visitor } from '../entities/visitor';
import { VisitorRepository } from '../repositories/visitor-repository';

interface GetVisitorRequest {
  visitorId: string;
}

interface GetVisitorResponse {
  visitor: Visitor;
}

@Injectable()
export class GetVisitor {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute(request: GetVisitorRequest): Promise<GetVisitorResponse> {
    const { visitorId } = request;

    const visitor = await this.visitorRepository.findById(visitorId);

    if (!visitor) {
      throw new NotFoundException('Visitante não encontrado.');
    }

    return { visitor };
  }
}
