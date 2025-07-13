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

    try {
        await pool.query(query);
        console.log('Table "posts" is ready');
    } catch (err) {
        console.error('Failed to create table:', err);
        process.exit(1);
    }
}
