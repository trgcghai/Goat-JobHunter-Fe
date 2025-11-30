import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  AcceptApplicationStatusRequest,
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
  FetchApplicationsResponse, RejectApplicationStatusRequest,
  UpdateApplicationStatusResponse
} from "./applicationType";

export const applicationApi = api.injectEndpoints({
    overrideExisting: true,
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
            job: { jobId }
          }
        }),
        invalidatesTags: ["Application"]
      }),

      acceptApplicationStatus: builder.mutation<
        UpdateApplicationStatusResponse,
        AcceptApplicationStatusRequest
      >({
        query: (data) => ({
          url: "/applications/accepted",
          method: "PUT",
          data
        }),
        invalidatesTags: ["Application"]
      }),

      rejectApplicationStatus: builder.mutation<
        UpdateApplicationStatusResponse,
        RejectApplicationStatusRequest
      >({
        query: (data) => ({
          url: "/applications/rejected",
          method: "PUT",
          data
        }),
        invalidatesTags: ["Application"]
      }),

      deleteApplication: builder.mutation<
        DeleteApplicationResponse,
        DeleteApplicationRequest
      >({
        query: (applicationId) => ({
          url: `/applications/${applicationId}`,
          method: "DELETE"
        }),
        invalidatesTags: ["Application"]
      }),

      fetchApplicationById: builder.query<
        FetchApplicationByIdResponse,
        FetchApplicationByIdRequest
      >({
        query: (applicationId) => ({
          url: `/applications/${applicationId}`,
          method: "GET"
        }),
        providesTags: ["Application"]
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
              jobTitle: "job.title" // Nested field cho job title
            },
            defaultSort: "createdAt,desc",
            sortableFields: ["createdAt", "status"]
          });

          return {
            url: "/all-applications",
            method: "GET",
            params: queryParams
          };
        },
        providesTags: ["Application"]
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
              jobTitle: "job.title" // Nested field cho job title
            },
            defaultSort: "createdAt,desc",
            sortableFields: ["createdAt", "status"]
          });

          return {
            url: "/applications",
            method: "GET",
            params: queryParams
          };
        },
        providesTags: ["Application"]
      }),

      fetchApplicationsByCurrentApplicant: builder.query<
        FetchApplicationsByApplicantResponse,
        FetchApplicationsByApplicantRequest
      >({
        query: (params) => {
          const { params: queryParams } = buildSpringQuery({
            params,
            filterFields: [], // Không có filter đặc biệt
            defaultSort: "updatedAt,desc"
          });

          return {
            url: "/applications/by-applicant",
            method: "GET",
            params: queryParams
          };
        },
        providesTags: ["Application"]
      }),

      fetchApplicationsByApplicant: builder.query<
        FetchApplicationsByApplicantResponse,
        FetchApplicationsByApplicantRequest & { applicantId: number }
      >({
        query: ({ applicantId, ...params }) => {
          const { params: queryParams } = buildSpringQuery({
            params,
            filterFields: [], // Không có filter đặc biệt
            defaultSort: "updatedAt,desc"
          });

          return {
            url: `/applications/by-applicant/${applicantId}`,
            method: "GET",
            params: queryParams
          };
        },
        providesTags: ["Application"]
      })
    })
  })
;

export const {
  useCreateApplicationMutation,
  useAcceptApplicationStatusMutation,
  useRejectApplicationStatusMutation,
  useDeleteApplicationMutation,
  useFetchApplicationByIdQuery,
  useFetchApplicationsQuery,
  useFetchApplicationsByRecruiterQuery,
  useFetchApplicationsByCurrentApplicantQuery,
  useFetchApplicationsByApplicantQuery
} = applicationApi;
