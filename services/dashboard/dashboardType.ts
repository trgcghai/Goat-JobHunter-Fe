import type { IBackendRes } from "@/types/api";

// Statistics User
export type StatisticsUserResponse = IBackendRes<Record<string, number>>;

// Statistics Job
export type StatisticsJobRequest = {
  startDate?: string;
  endDate?: string;
  status?: string;
};

export type StatisticsJobResponse = IBackendRes<Record<string, number>>;

// Statistics Application
export type StatisticsApplicationRequest = {
  startDate?: string;
  endDate?: string;
  status?: string;
};

export type StatisticsApplicationResponse = IBackendRes<Record<string, number>>;

// Statistics Application By Year
export type StatisticsApplicationByYearRequest = {
  year?: number;
  status?: string;
  recruiterId?: number;
};

export type StatisticsApplicationByYearResponse = IBackendRes<Record<number, number>>;

export interface UserStatistics {
  applicants: number;
  recruiters: number;
  admins: number;
}

export type TotalStatisticsResponse = IBackendRes<{
  users: UserStatistics;
  totalJobs: number;
  totalBlogs: number;
  totalApplications: number;
}>

export type ApplicationsByStatusResponse = IBackendRes<{
  [key: string]: {
    [month: number]: number;
  };
}>

export type TopBlogResponse = IBackendRes<{
  id: number;
  title: string;
  totalLikes: number;
  totalComments: number;
  totalReads: number;
}[]>

export type ApplicationsByYearParams = {
  year: number;
}

export type Top10BlogsParams = {
  year: number;
  month: number;
}