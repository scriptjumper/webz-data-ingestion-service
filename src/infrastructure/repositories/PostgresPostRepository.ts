import { Post } from '../../domain/models/Post';
import pool from '../../config/database';

export class PostgresPostRepository {
  async savePosts(posts: Post[]): Promise<void> {
    if (posts.length === 0) return;

    const query = `
      INSERT INTO posts (
        uuid, title, text, url, published, author, language,
        site, country, domain_rank, entities, crawled
      ) VALUES 
        ${posts.map((_, i) => `
          (
            $${i * 12 + 1}, $${i * 12 + 2}, $${i * 12 + 3}, $${i * 12 + 4},
            $${i * 12 + 5}, $${i * 12 + 6}, $${i * 12 + 7}, $${i * 12 + 8},
            $${i * 12 + 9}, $${i * 12 + 10}, $${i * 12 + 11}, $${i * 12 + 12}
          )`).join(',')}
      ON CONFLICT (uuid) DO NOTHING;
    `;

    const values = posts.flatMap(post => [
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
      console.log(`Saved ${posts.length} posts`);
    } catch (err) {
      console.error('Error inserting posts:', err);
      throw err;
    }
  }
}
