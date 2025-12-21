import type { IBackendRes, IModelPaginate } from "@/types/api";
import { Company } from "@/types/model";

export type CompanyIdRequest = number;

export type FetchCompaniesRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  name?: string;
  addresses?: string[];
  enabled?: boolean;
  verified?: boolean;
};

export type CompanyMutationResponse = IBackendRes<Company>;

export type FetchCompaniesResponse = IBackendRes<IModelPaginate<Company>>;

export type FetchCompanyByIdResponse = IBackendRes<Company>;

export type FetchGroupedAddressesByCompanyResponse = IBackendRes<
  Record<string, string[]>
>;
