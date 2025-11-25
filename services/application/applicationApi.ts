import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  FetchApplicationByIdRequest,
  FetchApplicationByIdResponse,
  FetchApplicationsByApplicantRequest,
  FetchApplicationsByApplicantResponse,
  FetchApplicationsByRecruiterResponse,
  FetchApplicationsRequest,
  FetchApplicationsResponse,
  UpdateApplicationStatusRequest,
  UpdateApplicationStatusResponse,
} from "./applicationType";

export const applicationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation<
      CreateApplicationResponse,
      CreateApplicationRequest
    >({
      query: ({ resumeUrl, email, jobId, userId }) => ({
        url: "/applications",
        method: "POST",
        data: {
          email,
          resumeUrl,
          status: "PENDING",
          applicant: { userId, type: "applicant" },
          job: { jobId },
        },
      }),
      invalidatesTags: ["Application"],
    }),

    updateApplicationStatus: builder.mutation<
      UpdateApplicationStatusResponse,
      UpdateApplicationStatusRequest
    >({
      query: ({ applicationId, status, resumeUrl }) => ({
        url: "/applications",
        method: "PUT",
        data: { applicationId, status, resumeUrl },
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplication: builder.mutation<
      DeleteApplicationResponse,
      DeleteApplicationRequest
    >({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),

    fetchApplicationById: builder.query<
      FetchApplicationByIdResponse,
      FetchApplicationByIdRequest
    >({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    fetchApplications: builder.query<
      FetchApplicationsResponse,
      FetchApplicationsRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["jobTitle", "status"], // Filter theo status
          textSearchFields: ["jobTitle"], // LIKE search cho job title
          nestedFields: {
            jobTitle: "job.title", // Nested field cho job title
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["createdAt", "status"],
        });

        return {
          url: "/all-applications",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Application"],
    }),

    fetchApplicationsByRecruiter: builder.query<
      FetchApplicationsByRecruiterResponse,
      FetchApplicationsRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["jobTitle", "status"], // Filter theo status (array sẽ dùng sfIn)
          textSearchFields: ["jobTitle"], // LIKE search cho job title
          nestedFields: {
            jobTitle: "job.title", // Nested field cho job title
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["createdAt", "status"],
        });

        return {
          url: "/applications",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Application"],
    }),

    fetchApplicationsByApplicant: builder.query<
      FetchApplicationsByApplicantResponse,
      FetchApplicationsByApplicantRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [], // Không có filter đặc biệt
          defaultSort: "updatedAt,desc",
        });

        return {
          url: "/applications/by-applicant",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Application"],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useFetchApplicationByIdQuery,
  useFetchApplicationsQuery,
  useFetchApplicationsByRecruiterQuery,
  useFetchApplicationsByApplicantQuery,
} = applicationApi;
