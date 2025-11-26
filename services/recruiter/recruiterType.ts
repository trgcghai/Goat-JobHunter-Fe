import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Contact, Recruiter } from "@/types/model";
import { Gender } from "@/types/enum";

// Create Recruiter
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

export type CreateRecruiterResponse = IBackendRes<Recruiter>;

// Update Recruiter
export type UpdateRecruiterRequest = {
  userId: number,
  username: string;
  fullName: string;
  contact: Contact;
  address: string;
  dob: Date,
  gender: Gender,
  description: string;
  website: string;
  avatar: string;
}

export type UpdateRecruiterResponse = IBackendRes<Recruiter>;

// Delete Recruiter
export type DeleteRecruiterRequest = string; // recruiterId

export type DeleteRecruiterResponse = IBackendRes<Recruiter>;

// Fetch Recruiters (with pagination)
export type FetchRecruitersRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  fullName?: string;
  address?: string;
  enabled?: boolean;
};

export type FetchRecruitersResponse = IBackendRes<IModelPaginate<Recruiter>>;

// Fetch Recruiter By Id
export type FetchRecruiterByIdRequest = string; // recruiterId

export type FetchRecruiterByIdResponse = IBackendRes<Recruiter>;
