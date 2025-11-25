import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Job } from "@/types/model";

// Create Job
export type CreateJobRequest = {
  title: string;
  location: string;
  salary: number;
  quantity: number;
  description: string;
  level: string;
  startDate: string; // LocalDate format: YYYY-MM-DD
  endDate: string; // LocalDate format: YYYY-MM-DD
  active: boolean;
  workingType: string;
  careerId: number;
  skillIds: number[];
  recruiterId: number;
};

export type CreateJobResponse = IBackendRes<Job>;

// Update Job
export type UpdateJobRequest = {
  jobId: string;
} & Partial<Omit<CreateJobRequest, "recruiterId">>; // recruiterId không được cập nhật

export type UpdateJobResponse = IBackendRes<Job>;

// Delete Job
export type DeleteJobRequest = string; // jobId

export type DeleteJobResponse = IBackendRes<Job>;

// Fetch Jobs (with pagination)
export type FetchJobsRequest = {
  page?: number;
  size?: number;
  title?: string;
  location?: string;
  level?: string | string[]; // Có thể là string hoặc array
  workingType?: string | string[]; // Có thể là string hoặc array
  salary?: number;
  active?: boolean;
  skills?: string[]; // Array of skill names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow dynamic keys
};

export type FetchJobsResponse = IBackendRes<IModelPaginate<Job>>;

export type FetchJobByRecruiterRequest = {
  recruiterId: string;
} & Omit<FetchJobsRequest, "active">;

export type FetchJobByCurrentRecruiterRequest = FetchJobsRequest;

// Fetch Job By Id
export type FetchJobByIdRequest = string; // jobId

export type FetchJobByIdResponse = IBackendRes<Job>;

// activate and deactivate job
export type JobIdsRequest = {
  jobIds: number[];
};

export type ToggleJobActiveResponse = IBackendRes<
  {
    jobId: number;
    active: boolean;
    status: "success" | "failed";
  }[]
>;

// count applications for jobs
export type JobApplicationCountResponse = IBackendRes<
  {
    jobId: number;
    applications: number;
  }[]
>;
