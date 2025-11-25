import { Education, Gender, Level, WorkingType } from "@/types/enum";

export type User = {
  userId: number;
  contact: {
    phone?: string;
    email: string;
  };
  address: string;
  dob: string;
  fullName: string;
  gender: Gender;
  username: string;
  type: string;
  avatar: string;
  enabled: boolean;
  role: Role;
};

export type Recruiter = User & {
  description: string;
  address: string;
};

export type Applicant = User & {
  availableStatus: boolean;
  education: Education;
  level: Level;
  resumeUrl: string;
};

export type FullUser = Applicant & Recruiter;

export type Skill = {
  skillId: string;
  name: string;

  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
};

export type Career = {
  careerId?: string;
  name?: string;

  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
};

export type Job = {
  jobId: number;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  level: Level;
  quantity: number;
  salary: number;
  title: string;
  workingType: WorkingType;
  location: string;
  recruiter: Recruiter;
  skills: Skill[];
  career: Career;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
};

export type Application = {
  applicationId: string;
  email: string;
  resumeUrl: string;
  status: string;
  user: { userId: string; fullName: string };
  recruiterName: string;
  job: { jobId: string; title: string };
  createdAt?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  updatedAt?: string;
};

export type Permission = {
  permissionId?: string;
  apiPath?: string;
  method?: string;
  module?: string;
  name?: string;

  createdAt?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  updatedAt?: string;
};

export type Role = {
  roleId?: string;
  description: string;
  active: boolean;
  name: string;

  permissions: Permission[] | string[];

  createdAt?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  updatedAt?: string;
};

export type Contact = {
  phone?: string;
  email?: string;
};

export type Select = {
  label: string | undefined;
  value: string | undefined;
  key?: string | undefined;
};

export type Subscriber = {
  subscriberId: number;
  name: string;
  email: string;
  skills: Skill[];

  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Blog = {
  blogId?: string;
  title: string;
  banner: string;
  description: string;
  content: string[];
  tags: string[];
  draft: boolean;
  activity?: {
    totalLikes: number | undefined;
    totalComments: number | undefined;
    totalReads: number | undefined;
    totalParentComments: number | undefined;
  };
  author?: User;

  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Comment = {
  commentId?: string;
  comment: string;
  isReply: boolean;
  blog: {
    blogId: string;
  };
  parent: {
    commentId: string;
  };

  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NotificationType = {
  notificationId?: string;
  type: "LIKE" | "COMMENT" | "REPLY";
  seen: boolean;
  blog: {
    blogId: string;
  };
  actor: {
    userId: string;
  };
  recipient: {
    userId: string;
  };
  comment?: {
    commentId: string;
  };
  reply?: {
    commentId: string;
  };
  repliedOnComment?: {
    commentId: string;
  };

  createdAt?: string;
};
