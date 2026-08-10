import { BadRequestException } from '@nestjs/common';

export class VisitorAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Já existe um visitante cadastrado com este documento.');
  }
}
