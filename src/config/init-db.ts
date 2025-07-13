import { logger } from '../utils/logger';
import pool from './database';

export async function initializeSchema() {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      uuid TEXT PRIMARY KEY,
      title TEXT,
      text TEXT,
      url TEXT,
      published TIMESTAMP,
      author TEXT,
      language TEXT,
      site TEXT,
      country TEXT,
      domain_rank INT,
      entities TEXT[],
      crawled TIMESTAMP
    );
  `;

  // TODO: Use a migration tool for schema changes and versioning
  try {
    await pool.query(query);
    logger.info('Table "posts" is ready');
  } catch (err) {
    logger.error('Failed to create table:', err);
    process.exit(1);
  }
}
