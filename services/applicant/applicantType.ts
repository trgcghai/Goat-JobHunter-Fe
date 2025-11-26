import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Applicant, Contact } from "@/types/model";
import { Education, Gender, Level } from "@/types/enum";

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
  userId: number,
  username: string;
  fullName: string;
  contact: Contact;
  address: string;
  dob: Date;
  gender: Gender;
  education: Education;
  level: Level;
  avatar: string;
}

export type UpdateApplicantResponse = IBackendRes<Applicant>;

// Delete Applicant
export type DeleteApplicantRequest = string; // applicantId

export type DeleteApplicantResponse = IBackendRes<Applicant>;

// Fetch Applicants (with pagination)
export type FetchApplicantsRequest = string; // query string

export type FetchApplicantsResponse = IBackendRes<IModelPaginate<Applicant>>;

// Fetch Applicant By Id
export type FetchApplicantByIdRequest = string; // applicantId

export type FetchApplicantByIdResponse = IBackendRes<{
  userId: number,
  address: string,
  contact: Contact,
  username: string,
  fullName: string,
  avatar: string,
  gender: Gender,
  dob: Date,
  enabled: boolean,
  role: { roleId: number, name: string }
  createdAt: Date,
  updatedAt: Date,
  availableStatus: boolean,
  education: Education,
  level: Level
}>;
