import type { IBackendRes, IModelPaginate } from "@/types/api";
import type {
  Blog,
  Job,
  Recruiter,
  User
} from "@/types/model";

// Create Request Types
export type CreateUserRequest = {
  email: string;
  role: string;
  fullName?: string;
  phone?: string;
  address?: string;
  username?: string;
};

// Base Request Types
export type UserIdsRequest = {
  userIds: number[];
};

// Password Management
export type UpdatePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
};

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

// Saved Jobs
export type JobIdsRequest = {
  jobIds: number[];
};

export type CheckSavedJobsRequest = JobIdsRequest;

// Saved Blogs
export type BlogIdsRequest = {
  blogIds: number[];
};

export type CheckLikedBlogsRequest = BlogIdsRequest;

// Follow Recruiters
export type RecruiterIdsRequest = {
  recruiterIds: number[];
};

export type FollowRecruitersRequest = RecruiterIdsRequest;

// Fetch with Pagination
export type FetchUsersRequest = {
  page?: number;
  size?: number;
  email?: string;
  phone?: string;
  role?: string;
  enabled?: boolean;
};

// Response Types
export type UserMutationResponse = IBackendRes<User>;

export type FetchUsersResponse = IBackendRes<IModelPaginate<User>>;

export type UpdatePasswordResponse = IBackendRes<User>;

export type ResetPasswordResponse = IBackendRes<unknown>;

// Saved Jobs Responses
export type GetSavedJobsResponse = IBackendRes<IModelPaginate<Job>>;

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

// Saved Blogs Responses
export type GetSavedBlogsResponse = IBackendRes<IModelPaginate<Blog>>;

export type SaveBlogsResponse = {
  userId: number;
  savedBlogs: Blog[];
};

export type CheckSavedBlogsResponse = IBackendRes<{
  blogId: number;
  result: boolean;
}[]>;

// Liked Blogs Responses
export type GetLikedBlogsResponse = IBackendRes<IModelPaginate<Blog>>;

export type LikedBlogsResponse = {
  userId: number;
  likedBlogs: Blog[];
};

export type CheckLikedBlogsResponse = IBackendRes<
  {
    blogId: number;
    result: boolean;
  }[]
>;

// Follow Recruiters Responses
export type GetFollowedRecruitersResponse = IBackendRes<Recruiter[]>;

export type FollowRecruitersResponse = IBackendRes<User>;

export type CheckRecruitersFollowedResponse = IBackendRes<
  {
    recruiterId: number;
    result: boolean;
  }[]
>;

// User Status Responses
export type UserStatusResponse = IBackendRes<
  {
    userId: number;
    enabled: boolean;
  }[]
>;