import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { FullUser, Job, User } from "@/types/model";

// Fetch Users (with pagination)
export type FetchUsersRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  keyword?: string;
  type?: "recruiter" | "applicant";
  enabled?: boolean;
};

export type FetchUsersResponse = IBackendRes<IModelPaginate<User>>;

// Fetch User By Email
export type FetchUserByEmailResponse = IBackendRes<FullUser>;

// Update Password
export type UpdatePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
};

export type UpdatePasswordResponse = IBackendRes<User>;

// Reset Password
export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = IBackendRes<unknown>;

// Save Jobs
// Request types
export type SaveJobsRequest = {
  jobIds: number[];
};

export type CheckSavedJobsRequest = {
  jobIds: number[];
};

// Response types
export type GetSavedJobsResponse = IBackendRes<Job[]>;

export type SaveJobsResponse = {
  userId: number;
  savedJobs: Job[];
};

export type CheckSavedJobsResponse = IBackendRes<
  {
    jobId: number;
    result: boolean;
  }[]
>;

// Follow Recruiters
export type FollowRecruitersRequest = {
  userId: number;
  followedRecruiters: { userId: number }[];
};

export type FollowRecruitersResponse = IBackendRes<User>;
