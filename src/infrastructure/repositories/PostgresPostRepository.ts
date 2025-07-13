import { Post } from '../../domain/interfaces/Post';
import pool from '../../config/database';

import { readFileSync } from 'fs';
import path from 'path';
import { logger } from '../../utils/logger';

const insertPostQuery = readFileSync(
  path.join(__dirname, '../sql/insertPosts.sql'),
  'utf8'
);

export class PostgresPostRepository {
  async savePosts(posts: Post[]): Promise<void> {
    if (posts.length === 0) return;

    const query = insertPostQuery;

    const values = posts.flatMap((post) => [
      post.uuid,
      post.title,
      post.text,
      post.url,
      post.published,
      post.author,
      post.language,
      post.site,
      post.country,
      post.domainRank,
      post.entities,
      post.crawled,
    ]);

    try {
      await pool.query(query, values);
      logger.info(`Saved ${posts.length} posts`);
    } catch (err) {
      logger.error('Error inserting posts:', err);
      throw err;
    }
  }
}
