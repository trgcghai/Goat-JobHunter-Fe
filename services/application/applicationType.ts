import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Application } from "@/types/model";
import { InterviewType } from "@/types/enum";

// Base Request Types
export type ApplicationIdRequest = string;

export type ApplicationIdsRequest = {
  applicationIds: number[];
};

// Create
export type CreateApplicationRequest = {
  resumeUrl: string;
  email: string;
  jobId: string;
  userId: string | number;
};

// Update Status
export type AcceptApplicationStatusRequest = ApplicationIdsRequest & {
  interviewDate: Date;
  interviewType: InterviewType;
  location: string;
  note: string;
};

export type RejectApplicationStatusRequest = ApplicationIdsRequest & {
  reason: string;
};

// Fetch with Pagination
export type FetchApplicationsRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  jobTitle?: string;
  status?: string[];
};

export type FetchApplicationsByApplicantRequest = {
  page?: number;
  size?: number;
  applicantId?: number;
};

export type CountApplicationsRequest = {
  applicantId: number;
  jobId: number;
}

// Response Types
export type ApplicationMutationResponse = IBackendRes<Application>;

export type FetchApplicationsResponse = IBackendRes<IModelPaginate<Application>>;

export type FetchApplicationByIdResponse = IBackendRes<Application>;

export type CountApplicationsResponse = IBackendRes<{ submittedApplications: number }>;