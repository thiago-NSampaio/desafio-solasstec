import { Injectable } from '@nestjs/common';
import { Visitor } from '../entities/visitor';
import { VisitorRepository } from '../repositories/visitor-repository';

interface GetVisitorByDocumentRequest {
  document: string;
}

interface GetVisitorByDocumentResponse {
  visitor: Visitor | null;
}

@Injectable()
export class GetVisitorByDocument {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute(
    request: GetVisitorByDocumentRequest,
  ): Promise<GetVisitorByDocumentResponse> {
    const visitor = await this.visitorRepository.findByDocument(
      request.document,
    );

    return { visitor };
  }
}
