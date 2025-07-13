import { initializeSchema } from './config/init-db';
import pool from './config/database';

/**
 * Entry point of the service.
 * 
 * Currently, this initializes the PostgreSQL schema by ensuring the `posts` table exists.
 */
(async () => {
  try {
    // Ensure DB schema is in place
    await initializeSchema();

    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  } finally {
    // Gracefully close DB connection pool
    await pool.end();
    process.exit();
  }
})();
