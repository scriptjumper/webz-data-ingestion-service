import axios from 'axios';
import { WebzService } from '../WebzService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WebzService', () => {
    it('should fetch and map posts correctly', async () => {
        const mockData = {
            posts: [{
                title: 'Test',
                text: 'Sample',
                url: 'https://example.com',
                published: '2023-01-01',
                author: 'Someone',
                language: 'english',
                site: 'example.com',
                country: 'US',
                thread: { domain_rank: 100 },
                entities: { persons: [{ name: 'Elon Musk' }] },
                crawled: '2023-01-01',
            }],
            totalResults: 1,
            moreResultsAvailable: 0,
        };

        mockedAxios.get.mockResolvedValue({
            data: mockData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                url: ''
            },
        });

        const service = new WebzService('fake-token', 'tesla', 'https://api.webz.io/newsApiLite');
        const result = await service.fetchAllPosts();

        expect(result.posts.length).toBe(1);
        expect(result.posts[0].url).toBe('https://example.com');
    });
});
