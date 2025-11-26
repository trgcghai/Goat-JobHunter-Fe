import { Contact } from "@/types/model";
import { Gender } from "@/types/enum";

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