import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Career } from "@/types/model";

// Base Request Types
export type CareerIdRequest = number;

export type CareerNameRequest = {
  name: string;
};

// Create & Update
export type CreateCareerRequest = CareerNameRequest;

export type UpdateCareerRequest = CareerNameRequest & {
  careerId: string;
};

// Fetch with Pagination
export type FetchCareersRequest = {
  page?: number;
  size?: number;
  name?: string;
};

// Response Types
export type CareerMutationResponse = IBackendRes<Career>;

export type FetchCareersResponse = IBackendRes<IModelPaginate<Career>>;