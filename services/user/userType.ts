import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { FullUser, User } from "@/types/model";

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
export type SaveJobsRequest = {
  userId: number;
  savedJobs: { jobId: number }[];
};

export type SaveJobsResponse = IBackendRes<User>;

// Follow Recruiters
export type FollowRecruitersRequest = {
  userId: number;
  followedRecruiters: { userId: number }[];
};

export type FollowRecruitersResponse = IBackendRes<User>;
