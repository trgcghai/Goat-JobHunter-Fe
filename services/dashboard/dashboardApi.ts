import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    statisticsUser: builder.query<IBackendRes<Record<string, number>>, void>({
      query: () => ({ url: "/api/v1/dashboard/users", method: "GET" }),
    }),

    statisticsJob: builder.query<IBackendRes<Record<string, number>>, string>({
      query: (query) => ({
        url: `/api/v1/dashboard/jobs?${query}`,
        method: "GET",
      }),
    }),

    statisticsApplication: builder.query<
      IBackendRes<Record<string, number>>,
      string
    >({
      query: (query) => ({
        url: `/api/v1/dashboard/applications?${query}`,
        method: "GET",
      }),
    }),

    statisticsApplicationByYear: builder.query<
      IBackendRes<Record<number, number>>,
      { year: number; query: string }
    >({
      query: ({ year, query }) => ({
        url: `/api/v1/dashboard/applications-year?year=${year}&${query}`,
        method: "GET",
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
