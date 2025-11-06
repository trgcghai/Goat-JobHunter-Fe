import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Job } from "@/types/model";

// Create Job
export type CreateJobRequest = Job;

export type CreateJobResponse = IBackendRes<Job>;

// Update Job
export type UpdateJobRequest = {
  jobId: string;
  job: Job;
};

export type UpdateJobResponse = IBackendRes<Job>;

// Delete Job
export type DeleteJobRequest = string; // jobId

export type DeleteJobResponse = IBackendRes<Job>;

// Fetch Jobs (with pagination)
export type FetchJobsRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  keyword?: string;
  location?: string;
  career?: string;
  salary?: string;
  level?: string;
  status?: string;
  recruiterId?: string;
};

export type FetchJobsResponse = IBackendRes<IModelPaginate<Job>>;

// Fetch Job By Id
export type FetchJobByIdRequest = string; // jobId

export type FetchJobByIdResponse = IBackendRes<Job>;

// Count Job By Recruiter
export type CountJobByRecruiterResponse = IBackendRes<Record<string, number>>;
