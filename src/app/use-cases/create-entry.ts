import { Injectable } from '@nestjs/common/decorators';
import { Entry } from '../entities/entry';
import { EntryRepository } from '../repositories/entry-repository';

interface CreateEntryRequest {
  visitorId: string;
  roomId?: string | null;
  schedulingId?: string | null;
  enteredAt?: Date | null;
}

interface CreateEntryResponse {
  entry: Entry;
}

@Injectable()
export class CreateEntry {
  constructor(private entryRepository: EntryRepository) {}

  async execute(request: CreateEntryRequest): Promise<CreateEntryResponse> {
    const { visitorId, roomId, schedulingId, enteredAt } = request;

    const entry = new Entry(visitorId, roomId, schedulingId, enteredAt);

    const createdEntry = await this.entryRepository.create(entry);

    return { entry: createdEntry };
  }
}
