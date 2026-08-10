import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVisitor } from '../../../app/use-cases/create-visitor';
import { GetVisitor } from '../../../app/use-cases/get-visitor';
import { GetVisitors } from '../../../app/use-cases/get-visitors';
import { GetVisitorByDocument } from '../../../app/use-cases/get-visitor-by-document';
import { CreateVisitorBody } from '../dtos/create-visitor-body';
import { VisitorPresenter } from '../presenters/visitor-presenter';

@Controller('/visitors')
export class VisitorController {
  constructor(
    private createVisitor: CreateVisitor,
    private getVisitor: GetVisitor,
    private getVisitors: GetVisitors,
    private getVisitorByDocument: GetVisitorByDocument,
  ) {}

  @Post()
  async create(@Body() body: CreateVisitorBody) {
    const {
      name,
      dateOfBirth,
      document,
      photo,
      priorityLevelId,
    } = body;

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

  @Get('document/:document')
  async findByDocument(@Param('document') document: string) {
    const { visitor } = await this.getVisitorByDocument.execute({
      document,
    });

    return {
      visitor: visitor ? VisitorPresenter.toHTTP(visitor) : null,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const { visitor } = await this.getVisitor.execute({
      visitorId: id,
    });

    return {
      visitor: visitor ? VisitorPresenter.toHTTP(visitor) : null,
    };
  }

  @Get()
  async findMany() {
    const { visitors } = await this.getVisitors.execute();

    return {
      visitors: visitors.map((visitor) => VisitorPresenter.toHTTP(visitor)),
    };
  }
}
