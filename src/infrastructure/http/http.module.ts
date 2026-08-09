import { Module } from '@nestjs/common';
import { CreateVisitor } from '../../app/use-cases/create-visitor';
import { GetVisitor } from '../../app/use-cases/get-visitor';
import { GetVisitors } from '../../app/use-cases/get-visitors';
import { VisitorController } from './controllers/visitor.controller';
import { CreateRoom } from '../../app/use-cases/create-room';
import { GetRoom } from '../../app/use-cases/get-room';
import { GetRooms } from '../../app/use-cases/get-rooms';
import { RoomController } from './controllers/room.controller';
import { CreateScheduling } from '../../app/use-cases/create-scheduling';
import { GetScheduling } from '../../app/use-cases/get-scheduling';
import { SchedulingController } from './controllers/scheduling.controller';
import { CreateEntry } from '../../app/use-cases/create-entry';
import { GetEntry } from '../../app/use-cases/get-entry';
import { EntryController } from './controllers/entry.controller';
import { DatabaseModule } from '../database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    VisitorController,
    RoomController,
    SchedulingController,
    EntryController,
  ],
  providers: [
    CreateVisitor,
    GetVisitor,
    GetVisitors,
    CreateRoom,
    GetRoom,
    GetRooms,
    CreateScheduling,
    GetScheduling,
    CreateEntry,
    GetEntry,
  ],
})
export class HttpModule {}
