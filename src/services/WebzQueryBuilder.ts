export class WebzQueryBuilder {
  private baseUrl: string;
  private token: string;
  private query: string = '';
  private language?: string;

  constructor(token: string, baseUrl: string) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  setQuery(query: string): this {
    this.query = query;
    return this;
  }

  setLanguage(language: string): this {
    this.language = language;
    return this;
  }

  buildUrl(): string {
    const params = new URLSearchParams({
      token: this.token,
      q: this.query,
    });

    if (this.language) {
      params.append('language', this.language);
    }

    return `${this.baseUrl}?${params.toString()}`;
  }
}
