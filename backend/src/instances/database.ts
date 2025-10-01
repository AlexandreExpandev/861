import { PrismaClient } from '@prisma/client';

/**
 * @summary
 * Database instance using Prisma ORM
 */
export const db = new PrismaClient();

/**
 * @summary
 * Connect to database on startup
 */
export async function connectDatabase(): Promise<void> {
  try {
    await db.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

/**
 * @summary
 * Disconnect from database on shutdown
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await db.$disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection failed:', error);
  }
}
