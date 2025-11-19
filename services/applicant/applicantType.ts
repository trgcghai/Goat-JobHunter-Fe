import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Applicant, Contact } from "@/types/model";

// Create Applicant
export type CreateApplicantRequest = {
  fullName: string;
  address: string;
  contact: Contact;
  dob: Date;
  gender: string;
  password: string;
  username: string;
  availableStatus: boolean;
  enabled: boolean;
  education?: string;
  level?: string;
  role?: { roleId: string; name: string };
  avatar?: string;
  resumeUrl?: string;
};

export type CreateApplicantResponse = IBackendRes<Applicant>;

// Update Applicant
export type UpdateApplicantRequest = {
  userId: number;
  fullName?: string;
  username?: string;
  gender?: string;
  contact?: Contact;
  dob?: Date;
};

export type UpdateApplicantResponse = IBackendRes<Applicant>;

// Delete Applicant
export type DeleteApplicantRequest = string; // applicantId

export type DeleteApplicantResponse = IBackendRes<Applicant>;

// Fetch Applicants (with pagination)
export type FetchApplicantsRequest = string; // query string

export type FetchApplicantsResponse = IBackendRes<IModelPaginate<Applicant>>;

// Fetch Applicant By Id
export type FetchApplicantByIdRequest = string; // applicantId

export type FetchApplicantByIdResponse = IBackendRes<Applicant>;
