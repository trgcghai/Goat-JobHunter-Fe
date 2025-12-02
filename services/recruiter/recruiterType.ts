import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Contact, Recruiter } from "@/types/model";
import { Gender } from "@/types/enum";
import { FetchCurrentRecruiterDto } from "@/types/dto";

// Base Request Types
export type RecruiterIdRequest = number;

// Create & Update
export type CreateRecruiterRequest = {
  fullName: string;
  password: string;
  username: string;
  contact: Contact;
  address: string;
  enabled: boolean;
  description?: string;
  avatar?: string;
  role?: { roleId: string; name: string };
  website?: string;
};

export type UpdateRecruiterRequest = {
  userId: number;
  username: string;
  fullName: string;
  contact: Contact;
  address: string;
  dob: Date;
  gender: Gender;
  description: string;
  website: string;
  avatar: string;
};

// Fetch with Pagination
export type FetchRecruitersRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  fullName?: string;
  address?: string;
  enabled?: boolean;
};

// Response Types
export type RecruiterMutationResponse = IBackendRes<Recruiter>;

export type FetchRecruitersResponse = IBackendRes<IModelPaginate<Recruiter>>;

export type FetchRecruiterByIdResponse = IBackendRes<Recruiter>;

export type FetchCurrentRecruiterResponse = IBackendRes<FetchCurrentRecruiterDto>;