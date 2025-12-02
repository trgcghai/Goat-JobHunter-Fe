import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Applicant, Contact } from "@/types/model";
import { Education, Gender, Level } from "@/types/enum";
import { FetchCurrentApplicantDto } from "@/types/dto";

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

export type ApplicantMutationResponse = IBackendRes<Applicant>;


export type FetchApplicantsResponse = IBackendRes<IModelPaginate<Applicant>>;


export type FetchApplicantByIdResponse = IBackendRes<FetchCurrentApplicantDto>;
