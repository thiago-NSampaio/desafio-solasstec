import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { seedTypePriorities } from '../../../../prisma/seed';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    try {
      await seedTypePriorities(this);
      this.logger.log('Tipos de prioridade verificados/criados com sucesso no banco de dados.');
    } catch (error) {
      this.logger.error('Erro ao popular tipos de prioridade:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
