import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Application } from "@/types/model";

// Create Application
export type CreateApplicationRequest = {
  resumeUrl: string;
  email: string;
  jobId: string;
  userId: string | number;
};

export type CreateApplicationResponse = IBackendRes<Application>;

// Update Application Status
export type UpdateApplicationStatusRequest = {
  applicationId: string;
  status: string;
  resumeUrl: string;
};

export type UpdateApplicationStatusResponse = IBackendRes<Application>;

// Delete Application
export type DeleteApplicationRequest = string; // applicationId

export type DeleteApplicationResponse = IBackendRes<Application>;

// Fetch Application By Id
export type FetchApplicationByIdRequest = string; // applicationId

export type FetchApplicationByIdResponse = IBackendRes<Application>;

// Fetch All Applications (Admin)
export type FetchApplicationsRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
};

export type FetchApplicationsResponse = IBackendRes<
  IModelPaginate<Application>
>;

// Fetch Applications By Recruiter
export type FetchApplicationsByRecruiterRequest = {
  recruiterId: string;
  page?: number;
  size?: number;
  sortBy?: string;
};

export type FetchApplicationsByRecruiterResponse = IBackendRes<
  IModelPaginate<Application>
>;

// Fetch Applications By Applicant
export type FetchApplicationsByApplicantResponse = IBackendRes<
  IModelPaginate<Application>
>;
