import { Contact } from "@/types/model";
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