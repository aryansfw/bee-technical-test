export type ApiResponse<T> = {
  data: T;
};

export type PaginatedApiResponse<T> = {
  total: number;
  page: number;
  total_pages: number;
  per_page: number;
} & ApiResponse<T[]>;
