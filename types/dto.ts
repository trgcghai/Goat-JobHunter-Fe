import { Contact, Role } from "@/types/model";
import { Education, Gender, Level } from "@/types/enum";

export type FetchCurrentRecruiterDto = {
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
  description: string,
  website: string
}

export type FetchCurrentApplicantDto = {
  userId: number,
  address: string,
  contact: Contact,
  username: string,
  fullName: string,
  avatar: string,
  gender: Gender,
  dob: string,
  enabled: boolean,
  role: { roleId: number, name: string }
  createdAt: string,
  updatedAt: string,
  availableStatus: boolean,
  education: Education,
  level: Level
}

export type LoginResponseDto = {
  accountId: number;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: Gender
  fullName: string;
  username: string;
  avatar: string;
  type: string;
  enabled: boolean;
  role: Role;
}

export type UserResponse = {
  accountId: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  fullName: string;
  avatar: string;
  gender: Gender;
  dob: string;
  enabled: boolean;
  coverPhoto: string;
  headline: string;
  bio: string;
  role: {
    roleId: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type ApplicantResponse = UserResponse & {
  availableStatus: boolean;
  education: Education;
  level: Level;
}

export type RecruiterResponse = UserResponse & {
  position: string;
  company: {
    companyId: number;
    name: string;
  }
}