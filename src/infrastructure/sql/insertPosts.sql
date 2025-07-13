INSERT INTO posts (
  uuid, title, text, url, published, author, language, site,
  country, domain_rank, entities, crawled
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8,
  $9, $10, $11, $12
) ON CONFLICT (url) DO NOTHING;
