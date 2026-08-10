import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

export const DEFAULT_TYPE_PRIORITIES = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    description: 'Idoso',
    priorityLevel: 1,
    active: true,
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    description: 'PCD (Pessoa com Deficiência)',
    priorityLevel: 2,
    active: true,
  },
];

export async function seedTypePriorities(prisma: PrismaClient) {
  for (const priority of DEFAULT_TYPE_PRIORITIES) {
    await prisma.typePriority.upsert({
      where: { id: priority.id },
      update: {
        description: priority.description,
        priorityLevel: priority.priorityLevel,
        active: priority.active,
      },
      create: priority,
    });
  }
}

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    await seedTypePriorities(prisma);
    console.log('✅ Tipos de prioridade criados/atualizados com sucesso no banco de dados!');
  } catch (error) {
    console.error('❌ Erro ao criar tipos de prioridade:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
