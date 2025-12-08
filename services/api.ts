import axiosInstance from "@/services/axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { IBackendRes } from "@/types/api";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
    }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axiosInstance({
          url: baseUrl + url,
          method,
          data,
          params,
          headers
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message
          }
        };
      }
    };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
  }),
  tagTypes: [
    "User",
    "Job",
    "Application",
    "Blog",
    "Recruiter",
    "Applicant",
    "Account",
    "Contact",
    "Skill",
    "Career",
    "Permission",
    "Role",
    "Subscriber",
    "Notifications",
    "SavedJob",
    "Comment",
    "Conversations",
    "LikedBlog",
    "Message",
  ],
  endpoints: (builder) => ({
    ping: builder.query<string, void>({
      query: () => ({
        url: "/ping",
        method: "GET"
      })
    }),

    clearCookies: builder.query<unknown, void>({
      query: () => ({
        url: "/clear-cookies",
        method: "GET"
      })
    }),

    backup: builder.query({
      query: () => ({
        url: "/admin/backup",
        method: "GET"
      })
    }),

    generateDescription: builder.mutation<string, string>({
      query: (content: string) => ({
        url: "/ai/generate/blogs/description",
        method: "POST",
        data: { content }
      })
    }),

    generateTags: builder.mutation<IBackendRes<string[]>, string>({
      query: (content: string) => ({
        url: "/ai/generate/blogs/tags",
        method: "POST",
        data: { content }
      })
    }),

    getUuid: builder.query<string, void>({
      query: () => ({
        url: "/uuid",
        method: "GET"
      })
    }),
  })
});

export const {
  usePingQuery,
  useClearCookiesQuery,
  useBackupQuery,
  useGenerateDescriptionMutation,
  useGenerateTagsMutation,
  useGetUuidQuery,
} = api;
