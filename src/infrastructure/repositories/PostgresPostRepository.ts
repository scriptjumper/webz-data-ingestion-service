import { Post } from '../../domain/interfaces/Post';
import pool from '../../config/database';
import { logger } from '../../utils/logger';

export class PostgresPostRepository {
  async savePosts(posts: Post[]): Promise<void> {
    if (posts.length === 0) return;

    // TODO: Consider batching large inserts for performance
    // TODO: Support upsert/update for existing posts if needed
    // TODO: Review SQL for injection safety and parameterization
    const query = `
      INSERT INTO posts (
        uuid, title, text, url, published, author, language,
        site, country, domain_rank, entities, crawled
      ) VALUES 
        ${posts
        .map(
          (_, i) => `
          (
            $${i * 12 + 1}, $${i * 12 + 2}, $${i * 12 + 3}, $${i * 12 + 4},
            $${i * 12 + 5}, $${i * 12 + 6}, $${i * 12 + 7}, $${i * 12 + 8},
            $${i * 12 + 9}, $${i * 12 + 10}, $${i * 12 + 11}, $${i * 12 + 12}
          )`,
        )
        .join(',')}
      ON CONFLICT (uuid) DO NOTHING;
    `;


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
