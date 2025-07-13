import dotenv from 'dotenv';
dotenv.config();

import pool from './config/database';
import { initializeSchema } from './config/init-db';
import { syncWebzData } from './app/syncWebzData';

(async () => {
  try {
    // Initialize DB schema
    await initializeSchema();

    // Run sync and provide callback
    await syncWebzData((retrievedCount, totalResults) => {
      console.log(`Callback: Retrieved ${retrievedCount} posts; Total results: ${totalResults}`);
    });

    console.log('Sync process completed successfully');
  } catch (error) {
    console.error('Error during application execution:', error);
  } finally {
    // Clean up DB connection pool
    await pool.end();
    process.exit();
  }
})();
