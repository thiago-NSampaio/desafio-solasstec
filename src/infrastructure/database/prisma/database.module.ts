import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VisitorRepository } from '../../../app/repositories/visitor-repository';
import { PrismaVisitorRepository } from './repositories/prisma-visitor-repository';
import { RoomRepository } from '../../../app/repositories/room-repository';
import { PrismaRoomRepository } from './repositories/prisma-room-repository';
import { SchedulingRepository } from '../../../app/repositories/scheduling-repository';
import { PrismaSchedulingRepository } from './repositories/prisma-scheduling-repository';

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
  ],
  exports: [VisitorRepository, RoomRepository, SchedulingRepository],
})
export class DatabaseModule {}
