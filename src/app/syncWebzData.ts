import dotenv from 'dotenv';
dotenv.config();

import { WebzService } from '../services/WebzService';
import { PostgresPostRepository } from '../infrastructure/repositories/PostgresPostRepository';
import { logger } from '../utils/logger';

type SyncCallback = (retrievedCount: number, totalResults: number) => void;

export async function syncWebzData(callback: SyncCallback): Promise<void> {
  const apiToken = process.env.WEBZ_API_TOKEN || '';
  const baseUrl = process.env.WEBZ_API_URL || 'https://api.webz.io';
  const query = process.env.WEBZ_QUERY || 'tesla';

  if (!apiToken) {
    throw new Error('WEBZ_API_TOKEN is not defined in environment variables');
  }

  // TODO: Support incremental sync (fetch only new/updated posts since last run)
  // TODO: Add retry logic for failed API calls
  const webzService = new WebzService(apiToken, query, baseUrl);
  const postRepo = new PostgresPostRepository();

  try {
    logger.info('Starting sync from Webz.io API...');

    const { posts, totalResults } = await webzService.fetchAllPosts();

    await postRepo.savePosts(posts);

    logger.info(`Sync complete. Retrieved ${posts.length} posts out of ${totalResults} total.`);

    callback(posts.length, totalResults);
  } catch (error) {
    logger.error('Sync failed:', error);
    callback(0, 0);
  }
}
