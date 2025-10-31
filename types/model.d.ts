type User = {
  userId: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string;
  gender?: string;
  dateOfBirth?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  savedJobs?: Job[];
  followedRecruiters?: Recruiter[];
};

type Recruiter = {
  description?: string;
  website?: string;
  jobs?: Job[];
  users?: User[];
} & User;

type Career = {
  careerId: number;
  name: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  jobs?: Job[];
};

type Skill = {
  skillId: number;
  name: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

type Job = {
  jobId: number;
  description?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  level: Level;
  quantity: number;
  salary: number;
  title: string;
  workingType: WorkingType;
  location: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  skills?: Skill[];
};

type Application = {
  applicationId: number;
  status: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

type Subscriber = {
  subscriberId: number;
  email: string;
  name?: string;
  skills?: Skill[];
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

type BlogActivity = {
  totalLikes: number;
  totalReads: number;
  totalParentComments: number;
  totalReplies: number;
};

type Blog = {
  blogId: number;
  title: string;
  banner?: string;
  description?: string;
  content?: string[];
  tags?: string[];
  draft: boolean;
  activity: BlogActivity;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  comments?: Comment[];
  notifications?: Notification[];
};

type Comment = {
  commentId: number;
  content: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

type Notification = {
  notificationId: number;
  type: string;
  message: string;
  read: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};
