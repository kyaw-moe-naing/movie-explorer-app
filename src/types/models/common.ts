interface PageFetchParams {
  id?: number;
  page?: number;
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