import { Injectable, NotFoundException } from '@nestjs/common';
import { Entry } from '../entities/entry';
import { EntryRepository } from '../repositories/entry-repository';

interface GetEntryRequest {
  entryId: string;
}

interface GetEntryResponse {
  entry: Entry;
}

@Injectable()
export class GetEntry {
  constructor(private entryRepository: EntryRepository) {}

  async execute(request: GetEntryRequest): Promise<GetEntryResponse> {
    const { entryId } = request;

    const entry = await this.entryRepository.findByIdWithRelations(entryId);

    if (!entry) {
      throw new NotFoundException('Entrada não encontrada.');
    }

    return { entry };
  }
}
