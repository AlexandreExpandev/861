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
    pool = await new sql.ConnectionPool(config.database).connect();
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
    await pool.request().query(`\n      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')\n      BEGIN\n        CREATE TABLE users (\n          idUser INT IDENTITY(1,1) PRIMARY KEY,\n          name NVARCHAR(100) NOT NULL,\n          email NVARCHAR(100) NOT NULL UNIQUE,\n          password NVARCHAR(100) NOT NULL,\n          dateCreated DATETIME2 NOT NULL,\n          dateModified DATETIME2 NULL,\n          active BIT NOT NULL DEFAULT 1\n        );\n      END\n    `);
    
    // Create tasks table if it doesn't exist
    await pool.request().query(`\n      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tasks')\n      BEGIN\n        CREATE TABLE tasks (\n          idTask INT IDENTITY(1,1) PRIMARY KEY,\n          idUser INT NOT NULL,\n          title NVARCHAR(255) NOT NULL,\n          description NVARCHAR(1000) NULL,\n          status NVARCHAR(50) NOT NULL DEFAULT 'Pendente',\n          dateCreated DATETIME2 NOT NULL,\n          dateModified DATETIME2 NULL,\n          deleted BIT NOT NULL DEFAULT 0,\n          CONSTRAINT FK_Tasks_User FOREIGN KEY (idUser) REFERENCES users(idUser)\n        );\n      END\n    `);
    
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
      Object.keys(params).forEach(key => {
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
