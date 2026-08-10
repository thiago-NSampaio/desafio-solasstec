import { Injectable } from '@nestjs/common';
import { Visitor } from '../entities/visitor';
import { VisitorRepository } from '../repositories/visitor-repository';
import { VisitorAlreadyExistsException } from './exceptions/visitor-already-exists-exception';

interface CreateVisitorRequest {
  name: string;
  document: string;
  dateOfBirth: Date;
  photo?: string;
  priorityLevelId?: string | null;
  hasDisability?: boolean;
}

interface CreateVisitorResponse {
  visitor: Visitor;
}

@Injectable()
export class CreateVisitor {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute(request: CreateVisitorRequest): Promise<CreateVisitorResponse> {
    const {
      name,
      document,
      dateOfBirth,
      photo,
      priorityLevelId,
      hasDisability,
    } = request;

    const cleanDoc = document.replace(/\D/g, '');

    const existingVisitor =
      await this.visitorRepository.findByDocument(cleanDoc);
    if (existingVisitor) {
      throw new VisitorAlreadyExistsException();
    }

    let finalPriorityLevelId = priorityLevelId ?? null;
    const tempVisitor = new Visitor(
      name,
      document,
      dateOfBirth,
      photo ?? null,
      finalPriorityLevelId,
    );
    if (tempVisitor.isPriority(hasDisability) && !finalPriorityLevelId) {
      finalPriorityLevelId = '1';
    }

    const visitor = new Visitor(
      name,
      document,
      dateOfBirth,
      photo ?? null,
      finalPriorityLevelId,
    );

    const createdVisitor = await this.visitorRepository.create(visitor);

    return { visitor: createdVisitor };
  }
}
