import { PrismaClient } from '@prisma/client';
import { config } from '../config';

// Create Prisma client instance
export const db = new PrismaClient();

/**
 * @summary Initialize database connection
 */
export async function setupDatabase(): Promise<void> {
  try {
    // Test database connection
    await db.$connect();
    console.log('Database connection established');

    // Register shutdown hooks
    process.on('beforeExit', async () => {
      await db.$disconnect();
      console.log('Database connection closed');
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
