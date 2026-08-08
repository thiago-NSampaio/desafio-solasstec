import { Module } from '@nestjs/common';
import { CreateVisitor } from '../../app/use-cases/create-visitor';
import { VisitorController } from './controllers/visitor.controller';
import { DatabaseModule } from '../database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitorController],
  providers: [CreateVisitor],
})
export class HttpModule {}
