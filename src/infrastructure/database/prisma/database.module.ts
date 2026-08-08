import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VisitorRepository } from '../../../app/repositories/visitor-repository';
import { PrismaVisitorRepository } from './repositories/prisma-visitor-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: VisitorRepository,
      useClass: PrismaVisitorRepository,
    },
  ],
  exports: [VisitorRepository],
})
export class DatabaseModule {}
