export type Account = {
  access_token: string;
  user: {
    userId: string;
    email: string;
    fullName: string;
    username: string;
    avatar?: string;
    type?: string;
    enabled?: boolean;
    role: {
      roleId: string;
      name: string;
      active: boolean;
      permissions: {
        permissionId: string;
        name: string;
        apiPath: string;
        method: string;
        module: string;
      }[];
    };
    savedJobs: Job[];
    followedRecruiters: Recruiter[];
    actorNotifications: Notification[];
  };
};

export type GetAccount = Omit<Account, "access_token">;

export type User = {
  userId?: string;
  fullName: string;
  address?: string;
  contact: Contact;
  dob?: Date;
  gender?: string;
  password: string;
  username?: string;
  avatar?: string;
  enabled?: boolean;

  role?: {
    roleId: string;
    name: string;
  };

  savedJob?: {
    jobId: string;
    title: string;
  };

  followedRecruiter?: {
    userId: string;
    fullName: string;
  };

  createdAt?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  updatedAt?: string;
};

export type Recruiter = User & {
  description?: string;
  website?: string;
};

export type Applicant = User & {
  availableStatus?: boolean;
  education?: string;
  level?: string;
  resumeUrl?: string;
};

export type FullUser = Applicant & Recruiter;

export type Skill = {
  skillId?: string;
  name?: string;

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
  jobId?: string;
  description: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  level: string;
  quantity: number;
  salary: number;
  title: string;
  workingType?: string;
  location?: string;

  recruiter?: {
    userId: string;
    fullName: string;
    avatar?: string;
    type?: string;
  };
  skills: Skill[];
  career: Career;

  createdAt?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  updatedAt?: string;
};

export type Application = {
  applicationId?: string;
  email: string;
  resumeUrl: string;
  status: string;

  user: string | { userId: string; fullName: string };
  recruiterName: string;
  job: string | { jobId: string; title: string };
  history?: {
    status: string;
    updatedAt: Date;
    updatedBy: { id: string; email: string };
  }[];

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
  subscriberId?: string;
  name?: string;
  email?: string;
  skills: string[];

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
  type: string;
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
