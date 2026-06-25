export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta?: {
    total?: number;
    perPage?: number;
    currentPage?: number;
    lastPage?: number;
  };
};
