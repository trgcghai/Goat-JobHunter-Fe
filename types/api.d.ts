export type IBackendRes<T> = {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
};

export type IModelPaginate<T> = {
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
};
