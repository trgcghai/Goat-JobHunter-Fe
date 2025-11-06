import { api } from "@/services/api";
import type {
  StatisticsApplicationByYearRequest,
  StatisticsApplicationByYearResponse,
  StatisticsApplicationRequest,
  StatisticsApplicationResponse,
  StatisticsJobRequest,
  StatisticsJobResponse,
  StatisticsUserResponse,
} from "./dashboardType";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    statisticsUser: builder.query<StatisticsUserResponse, void>({
      query: () => ({
        url: "/api/v1/dashboard/users",
        method: "GET",
      }),
    }),

    statisticsJob: builder.query<StatisticsJobResponse, StatisticsJobRequest>({
      query: (params) => ({
        url: "/api/v1/dashboard/jobs",
        method: "GET",
        params,
      }),
    }),

    statisticsApplication: builder.query<
      StatisticsApplicationResponse,
      StatisticsApplicationRequest
    >({
      query: (params) => ({
        url: "/api/v1/dashboard/applications",
        method: "GET",
        params,
      }),
    }),

    statisticsApplicationByYear: builder.query<
      StatisticsApplicationByYearResponse,
      StatisticsApplicationByYearRequest
    >({
      query: ({ year, ...params }) => ({
        url: "/api/v1/dashboard/applications-year",
        method: "GET",
        params: { year, ...params },
      }),
    }),
  }),
});

export const {
  useStatisticsUserQuery,
  useStatisticsJobQuery,
  useStatisticsApplicationQuery,
  useStatisticsApplicationByYearQuery,
} = dashboardApi;
