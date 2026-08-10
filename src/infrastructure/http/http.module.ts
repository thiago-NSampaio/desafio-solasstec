import { Module } from '@nestjs/common';
import { CreateVisitor } from '../../app/use-cases/create-visitor';
import { GetVisitor } from '../../app/use-cases/get-visitor';
import { GetVisitors } from '../../app/use-cases/get-visitors';
import { GetVisitorByDocument } from '../../app/use-cases/get-visitor-by-document';
import { VisitorController } from './controllers/visitor.controller';
import { CreateRoom } from '../../app/use-cases/create-room';
import { GetRoom } from '../../app/use-cases/get-room';
import { GetRooms } from '../../app/use-cases/get-rooms';
import { RoomController } from './controllers/room.controller';
import { CreateScheduling } from '../../app/use-cases/create-scheduling';
import { GetScheduling } from '../../app/use-cases/get-scheduling';
import { GetSchedulings } from '../../app/use-cases/get-schedulings';
import { UpdateScheduling } from '../../app/use-cases/update-scheduling';
import { SchedulingController } from './controllers/scheduling.controller';

import { CreateEntry } from '../../app/use-cases/create-entry';
import { GetEntry } from '../../app/use-cases/get-entry';
import { EntryController } from './controllers/entry.controller';
import { CreateHoliday } from '../../app/use-cases/create-holiday';
import { GetHolidays } from '../../app/use-cases/get-holidays';
import { HolidayController } from './controllers/holiday.controller';
import { CreateResponsibleRoom } from '../../app/use-cases/create-responsible-room';
import { GetRoomResponsibles } from '../../app/use-cases/get-room-responsibles';
import { ResponsibleRoomController } from './controllers/responsible-room.controller';
import { GetTypePriority } from '../../app/use-cases/get-type-priority';
import { GetTypePriorities } from '../../app/use-cases/get-type-priorities';
import { TypePriorityController } from './controllers/type-priority.controller';
import { DatabaseModule } from '../database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    VisitorController,
    RoomController,
    ResponsibleRoomController,
    SchedulingController,
    EntryController,
    HolidayController,
    TypePriorityController,
  ],
  providers: [
    CreateVisitor,
    GetVisitor,
    GetVisitors,
    GetVisitorByDocument,
    CreateRoom,
    GetRoom,
    GetRooms,
    CreateResponsibleRoom,
    GetRoomResponsibles,
    CreateScheduling,
    GetScheduling,
    GetSchedulings,
    UpdateScheduling,

    CreateEntry,
    GetEntry,
    CreateHoliday,
    GetHolidays,
    GetTypePriority,
    GetTypePriorities,
  ],
})
export class HttpModule {}

