import { Controller, Get, Param } from '@nestjs/common';
import { GetTypePriority } from '../../../app/use-cases/get-type-priority';
import { GetTypePriorities } from '../../../app/use-cases/get-type-priorities';
import { TypePriorityPresenter } from '../presenters/type-priority-presenter';

@Controller('/type-priorities')
export class TypePriorityController {
  constructor(
    private getTypePriority: GetTypePriority,
    private getTypePriorities: GetTypePriorities,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { typePriority } = await this.getTypePriority.execute({
      typePriorityId: id,
    });

    return {
      typePriority: TypePriorityPresenter.toHTTP(typePriority),
    };
  }

  @Get()
  async findMany() {
    const { typePriorities } = await this.getTypePriorities.execute();

    return {
      typePriorities: typePriorities.map(TypePriorityPresenter.toHTTP),
    };
  }
}
