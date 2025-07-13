export interface Post {
  uuid: string;
  title: string;
  text: string;
  url: string;
  published: string;
  author: string;
  language: string;
  site: string;
  country: string;
  domainRank: number;
  entities: string[];
  crawled: string;
}
