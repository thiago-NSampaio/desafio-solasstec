import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVisitor } from '../../../app/use-cases/create-visitor';
import { GetVisitor } from '../../../app/use-cases/get-visitor';
import { GetVisitors } from '../../../app/use-cases/get-visitors';
import { CreateVisitorBody } from '../dtos/create-visitor-body';
import { VisitorPresenter } from '../presenters/visitor-presenter';

@Controller('/visitors')
export class VisitorController {
  constructor(
    private createVisitor: CreateVisitor,
    private getVisitor: GetVisitor,
    private getVisitors: GetVisitors,
  ) {}

  @Post()
  async create(@Body() body: CreateVisitorBody) {
    const { name, dateOfBirth, document, photo, priorityLevelId } = body;

    const { visitor } = await this.createVisitor.execute({
      name,
      document,
      dateOfBirth: new Date(dateOfBirth),
      photo: photo ?? '',
      priorityLevelId: priorityLevelId ?? null,
    });

    return {
      visitor: VisitorPresenter.toHTTP(visitor),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { visitor } = await this.getVisitor.execute({
      visitorId: id,
    });

    return {
      visitor: VisitorPresenter.toHTTP(visitor),
    };
  }

  @Get()
  async findMany() {
    const { visitors } = await this.getVisitors.execute();

    return {
      visitors: visitors.map(VisitorPresenter.toHTTP),
    };
  }
}
