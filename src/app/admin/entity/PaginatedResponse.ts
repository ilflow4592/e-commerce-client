export interface PaginatedResponse<T> {
  data: T[];
  last: boolean;
  page: number;
  size: number;
}
