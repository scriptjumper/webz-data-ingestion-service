import { syncWebzData } from '../../app/syncWebzData';
import { WebzService } from '../../services/WebzService';
import { PostgresPostRepository } from '../../infrastructure/repositories/PostgresPostRepository';
import { Post } from '../../domain/interfaces/Post';

jest.mock('../../services/WebzService');
jest.mock('../../infrastructure/repositories/PostgresPostRepository');

describe('syncWebzData', () => {
  it('should call callback with correct values', async () => {
    const mockPosts: Post[] = [
      {
        uuid: '1',
        title: 'Test',
        text: 'Text',
        url: 'http://x.com',
        published: new Date().toISOString(),
        author: 'Author',
        language: 'en',
        site: 'x.com',
        country: 'US',
        domainRank: 0,
        entities: [],
        crawled: new Date().toISOString(),
      },
    ];

    (WebzService as jest.Mock).mockImplementation(() => ({
      fetchAllPosts: jest.fn().mockResolvedValue({ posts: mockPosts, totalResults: 1 }),
    }));

    (PostgresPostRepository as jest.Mock).mockImplementation(() => ({
      savePosts: jest.fn().mockResolvedValue(undefined),
    }));

    const callback = jest.fn();
    await syncWebzData(callback);

    expect(callback).toHaveBeenCalledWith(1, 1);
  });
});
