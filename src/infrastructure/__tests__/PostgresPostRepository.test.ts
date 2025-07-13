import pool from '../../config/database';
import { PostgresPostRepository } from '../repositories/PostgresPostRepository';
import { Post } from '../../domain/models/Post';

jest.mock('../../config/database', () => ({
    query: jest.fn(),
}));

describe('PostgresPostRepository', () => {
    it('should insert posts using parameterized query', async () => {
        const repo = new PostgresPostRepository();

        const mockPost: Post = {
            uuid: '123',
            title: 'Title',
            text: 'Text',
            url: 'http://x.com',
            published: new Date().toISOString(),
            author: 'Author',
            language: 'en',
            site: 'x.com',
            country: 'US',
            domainRank: 1,
            entities: ['Elon'],
            crawled: new Date().toISOString(),
        };

        await repo.savePosts([mockPost]);

        expect(pool.query).toHaveBeenCalledTimes(1);
    });
});
