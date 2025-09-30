import sql from 'mssql';
import { config } from '../config';
import { logger } from '../utils/logger';

// SQL Server connection pool
let pool: sql.ConnectionPool;

/**
 * @summary Initialize database connection
 */
export async function setupDatabase(): Promise<void> {
  try {
    pool = await new sql.ConnectionPool({
      server: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    }).connect();
    logger.info('Database connection established');

    // Initialize database schema if needed
    await initializeDatabase();
  } catch (error) {
    logger.error('Database connection failed', { error });
    throw error;
  }
}

/**
 * @summary Initialize database schema
 */
async function initializeDatabase(): Promise<void> {
  try {
    // Create users table if it doesn't exist
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
      BEGIN
        CREATE TABLE users (
          idUser INT IDENTITY(1,1) PRIMARY KEY,
          name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) NOT NULL UNIQUE,
          password NVARCHAR(100) NOT NULL,
          dateCreated DATETIME2 NOT NULL,
          dateModified DATETIME2 NULL,
          active BIT NOT NULL DEFAULT 1
        );
      END
    `);

    // Create tasks table if it doesn't exist
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tasks')
      BEGIN
        CREATE TABLE tasks (
          idTask INT IDENTITY(1,1) PRIMARY KEY,
          idUser INT NOT NULL,
          title NVARCHAR(255) NOT NULL,
          description NVARCHAR(1000) NULL,
          status NVARCHAR(50) NOT NULL DEFAULT 'Pendente',
          dateCreated DATETIME2 NOT NULL,
          dateModified DATETIME2 NULL,
          deleted BIT NOT NULL DEFAULT 0,
          CONSTRAINT FK_Tasks_User FOREIGN KEY (idUser) REFERENCES users(idUser)
        );
      END
    `);

    logger.info('Database schema initialized');
  } catch (error) {
    logger.error('Database schema initialization failed', { error });
    throw error;
  }
}

/**
 * @summary Execute a database query
 */
export async function dbRequest(query: string, params?: any): Promise<any> {
  try {
    if (!pool) {
      await setupDatabase();
    }

    const request = pool.request();

    // Add parameters to request
    if (params) {
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
    }

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    logger.error('Database query failed', { error, query });
    throw error;
  }
}
