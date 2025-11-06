import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Career } from "@/types/model";

// Create Career
export type CreateCareerRequest = {
  name: string;
};

export type CreateCareerResponse = IBackendRes<Career>;

// Update Career
export type UpdateCareerRequest = {
  careerId: string;
  name: string;
};

export type UpdateCareerResponse = IBackendRes<Career>;

// Delete Career
export type DeleteCareerRequest = string; // careerId

export type DeleteCareerResponse = IBackendRes<Career>;

// Fetch Careers (with pagination)
export type FetchCareersRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  keyword?: string;
};

export type FetchCareersResponse = IBackendRes<IModelPaginate<Career>>;
