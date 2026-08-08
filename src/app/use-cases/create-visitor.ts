import { Injectable } from '@nestjs/common/decorators';
import { Visitor } from '../entities/visitor';
import { VisitorRepository } from '../repositories/visitor-repository';

interface CreateVisitorRequest {
  name: string;
  document: string;
  dateOfBirth: Date;
  photo: string;
  priorityLevelId: string | null;
}

interface CreateVisitorResponse {
  visitor: Visitor;
}

@Injectable()
export class CreateVisitor {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute(request: CreateVisitorRequest): Promise<CreateVisitorResponse> {
    const { name, document, dateOfBirth, photo, priorityLevelId } = request;

    const visitor = new Visitor(
      name,
      document,
      dateOfBirth,
      photo,
      priorityLevelId,
    );

    await this.visitorRepository.create(visitor);

    return { visitor };
  }
}
