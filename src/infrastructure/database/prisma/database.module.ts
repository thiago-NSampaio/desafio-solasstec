import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VisitorRepository } from '../../../app/repositories/visitor-repository';
import { PrismaVisitorRepository } from './repositories/prisma-visitor-repository';
import { RoomRepository } from '../../../app/repositories/room-repository';
import { PrismaRoomRepository } from './repositories/prisma-room-repository';
import { SchedulingRepository } from '../../../app/repositories/scheduling-repository';
import { PrismaSchedulingRepository } from './repositories/prisma-scheduling-repository';
import { EntryRepository } from '../../../app/repositories/entry-repository';
import { PrismaEntryRepository } from './repositories/prisma-entry-repository';
import { HolidayRepository } from '../../../app/repositories/holiday-repository';
import { PrismaHolidayRepository } from './repositories/prisma-holiday-repository';
import { ResponsibleRoomRepository } from '../../../app/repositories/responsible-room-repository';
import { PrismaResponsibleRoomRepository } from './repositories/prisma-responsible-room-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: VisitorRepository,
      useClass: PrismaVisitorRepository,
    },
    {
      provide: RoomRepository,
      useClass: PrismaRoomRepository,
    },
    {
      provide: SchedulingRepository,
      useClass: PrismaSchedulingRepository,
    },
    {
      provide: EntryRepository,
      useClass: PrismaEntryRepository,
    },
    {
      provide: HolidayRepository,
      useClass: PrismaHolidayRepository,
    },
    {
      provide: ResponsibleRoomRepository,
      useClass: PrismaResponsibleRoomRepository,
    },
  ],
  exports: [
    VisitorRepository,
    RoomRepository,
    SchedulingRepository,
    EntryRepository,
    HolidayRepository,
    ResponsibleRoomRepository,
  ],
})
export class DatabaseModule {}
