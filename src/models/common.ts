interface PageFetchParams {
  id?: number;
  page?: number;
  language: 'en-US';
}

interface PageData<T> {
  results: T[];
  readonly page: number;
  readonly total_pages: number;
  readonly total_results: number;
}

interface DetailsPageData<T> {
  cast: T[];
  crew: T[];
}

export { type PageData, type DetailsPageData, type PageFetchParams };