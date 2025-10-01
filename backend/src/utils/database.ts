import sql from 'mssql';
import { config } from '../config';

// SQL Server connection pool
let pool: sql.ConnectionPool;

/**
 * @summary
 * Initialize the database connection pool
 */
export async function setupDatabase(): Promise<void> {
  try {
    pool = await new sql.ConnectionPool(config.database).connect();
    console.log('Connected to SQL Server database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

/**
 * @summary
 * Execute a SQL query with parameters
 *
 * @param query - SQL query string or stored procedure name
 * @param params - Query parameters
 * @param isStoredProcedure - Whether the query is a stored procedure
 */
export async function dbRequest(
  query: string,
  params: Record<string, any> = {},
  isStoredProcedure: boolean = false
): Promise<any[]> {
  try {
    if (!pool) {
      await setupDatabase();
    }

    const request = pool.request();

    // Add parameters to the request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    // Execute query or stored procedure
    const result = isStoredProcedure ? await request.execute(query) : await request.query(query);

    return result.recordset || [];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * @summary
 * Begin a transaction
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  if (!pool) {
    await setupDatabase();
  }

  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary
 * Execute a query within a transaction
 */
export async function transactionRequest(
  transaction: sql.Transaction,
  query: string,
  params: Record<string, any> = {}
): Promise<any[]> {
  const request = new sql.Request(transaction);

  // Add parameters to the request
  Object.entries(params).forEach(([key, value]) => {
    request.input(key, value);
  });

  const result = await request.query(query);
  return result.recordset || [];
}

/**
 * @summary
 * Commit a transaction
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary
 * Rollback a transaction
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}
