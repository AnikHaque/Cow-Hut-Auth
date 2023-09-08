import {SortOrder} from "mongoose";

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type ICalculatePaginationResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
export type IGenericPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data?: T | null;
};
