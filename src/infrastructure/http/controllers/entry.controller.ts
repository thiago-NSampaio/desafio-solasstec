import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEntry } from '../../../app/use-cases/create-entry';
import { GetEntry } from '../../../app/use-cases/get-entry';
import { CreateEntryBody } from '../dtos/create-entry-body';
import { EntryPresenter } from '../presenters/entry-presenter';

@Controller('/entrys')
export class EntryController {
  constructor(
    private createEntry: CreateEntry,
    private getEntry: GetEntry,
  ) {}

  @Post()
  async create(@Body() body: CreateEntryBody) {
    const { visitorId, roomId, schedulingId, enteredAt } = body;

    const { entry } = await this.createEntry.execute({
      visitorId,
      roomId: roomId ?? null,
      schedulingId: schedulingId ?? null,
      enteredAt: enteredAt ? new Date(enteredAt) : null,
    });

    return {
      entry: EntryPresenter.toHTTP(entry),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { entry } = await this.getEntry.execute({
      entryId: id,
    });

    return {
      entry: EntryPresenter.toHTTP(entry),
    };
  }
}
