import dotenv from 'dotenv';
dotenv.config();

import pool from './config/database';
import { initializeSchema } from './config/init-db';
import { syncWebzData } from './app/syncWebzData';
import { logger } from './utils/logger';

(async () => {
  try {
    // Initialize DB schema
    await initializeSchema();

    // Run sync and provide callback
    await syncWebzData((retrievedCount, totalResults) => {
      logger.info(`Callback: Retrieved ${retrievedCount} posts; Total results: ${totalResults}`);
    });

    logger.info('Sync process completed successfully');
  } catch (error) {
    logger.error('Error during application execution:', error);
  } finally {
    // Clean up DB connection pool
    await pool.end();
    process.exit();
  }
})();
