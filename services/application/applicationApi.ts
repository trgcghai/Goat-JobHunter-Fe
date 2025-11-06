import { api } from "@/services/api";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  FetchApplicationByIdRequest,
  FetchApplicationByIdResponse,
  FetchApplicationsByApplicantResponse,
  FetchApplicationsByRecruiterRequest,
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
        url: "/api/v1/applications",
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
        url: "/api/v1/applications",
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
        url: `/api/v1/applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),

    fetchApplicationById: builder.query<
      FetchApplicationByIdResponse,
      FetchApplicationByIdRequest
    >({
      query: (applicationId) => ({
        url: `/api/v1/applications/${applicationId}`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    fetchApplications: builder.query<
      FetchApplicationsResponse,
      FetchApplicationsRequest
    >({
      query: (params) => ({
        url: "/api/v1/all-applications",
        method: "GET",
        params,
      }),
      providesTags: ["Application"],
    }),

    fetchApplicationsByRecruiter: builder.query<
      FetchApplicationsByRecruiterResponse,
      FetchApplicationsByRecruiterRequest
    >({
      query: (params) => ({
        url: "/api/v1/applications",
        method: "GET",
        params,
      }),
      providesTags: ["Application"],
    }),

    fetchApplicationsByApplicant: builder.query<
      FetchApplicationsByApplicantResponse,
      void
    >({
      query: () => ({
        url: "/api/v1/applications/by-applicant",
        method: "GET",
      }),
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
