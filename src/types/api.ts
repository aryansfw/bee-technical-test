export type ApiResponse<T> = {
  data: T;
};

export type PaginatedApiResponse<T> = {
  total: number;
  page: number;
  total_pages: number;
  per_page: number;
} & ApiResponse<T[]>;

export type State<ErrorData> = {
  success?: boolean;
  message?: string | null;
  errors?: ErrorData;
};