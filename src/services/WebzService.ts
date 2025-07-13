import axios from 'axios';
import { Post } from '../domain/interfaces/Post';
import { WebzQueryBuilder } from './WebzQueryBuilder';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface WebzApiResponse {
  posts: any[];
  totalResults: number;
  moreResultsAvailable: number;
  next?: string;
}

export class WebzService {
  private apiToken: string;
  private query: string;
  private baseUrl: string;

  constructor(apiToken: string, query: string, baseUrl: string) {
    this.apiToken = apiToken;
    this.query = query;
    this.baseUrl = baseUrl;
  }

  async fetchAllPosts(): Promise<{ posts: Post[]; totalResults: number }> {
    const allPosts: Post[] = [];

    const builder = new WebzQueryBuilder(this.apiToken, this.baseUrl + '/newsApiLite')
      .setQuery(this.query)
      .setLanguage('english');

    let url = builder.buildUrl();

    while (url && allPosts.length < 1000) {
      try {
        const { data } = await axios.get<WebzApiResponse>(url);

        const transformed = data.posts.map((post) => this.mapToPost(post));
        allPosts.push(...transformed);

        logger.info(`Fetched ${transformed.length} posts — total so far: ${allPosts.length}`);

        if (data.moreResultsAvailable > 0 && data.next) {
          url = this.baseUrl + data.next;
        } else {
          break;
        }
      } catch (error: any) {
        logger.error('Failed to fetch from Webz.io:', error.message);
        // TODO: Implement retry logic and exponential backoff for API errors
        // TODO: Handle Webz.io API rate limits and error codes more gracefully
        break;
      }
    }

    return { posts: allPosts, totalResults: allPosts.length };
  }

  private mapToPost(raw: any): Post {
    return {
      uuid: raw.thread?.uuid || uuidv4(),
      title: raw.title || '',
      text: raw.text || '',
      url: raw.url,
      published: raw.published || new Date().toISOString(),
      author: raw.author || '',
      language: raw.language || '',
      site: raw.site || '',
      country: raw.country || '',
      domainRank: raw.thread?.domain_rank || 0,
      entities: raw.entities?.persons?.map((p: any) => p.name) || [],
      crawled: raw.crawled || new Date().toISOString(),
    };
  }
  // TODO: Make language and query builder more flexible for future enhancements
}
