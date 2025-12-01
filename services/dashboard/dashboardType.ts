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
