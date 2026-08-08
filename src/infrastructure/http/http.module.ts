import { Module } from '@nestjs/common';
import { CreateVisitor } from '../../app/use-cases/create-visitor';
import { VisitorController } from './controllers/visitor.controller';
import { CreateRoom } from '../../app/use-cases/create-room';
import { RoomController } from './controllers/room.controller';
import { CreateScheduling } from '../../app/use-cases/create-scheduling';
import { SchedulingController } from './controllers/scheduling.controller';
import { DatabaseModule } from '../database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitorController, RoomController, SchedulingController],
  providers: [CreateVisitor, CreateRoom, CreateScheduling],
})
export class HttpModule {}
