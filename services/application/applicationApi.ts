import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Application } from "@/types/model";

export const applicationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation<
      IBackendRes<Application>,
      {
        resumeUrl: string;
        email: string;
        jobId: string;
        userId: string | number;
      }
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
      IBackendRes<Application>,
      { applicationId: string; status: string; resumeUrl: string }
    >({
      query: ({ applicationId, status, resumeUrl }) => ({
        url: "/api/v1/applications",
        method: "PUT",
        data: { applicationId, status, resumeUrl },
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplication: builder.mutation<IBackendRes<Application>, string>({
      query: (applicationId) => ({
        url: `/api/v1/applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),

    fetchApplicationById: builder.query<IBackendRes<Application>, string>({
      query: (applicationId) => ({
        url: `/api/v1/applications/${applicationId}`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    fetchApplication: builder.query<
      IBackendRes<IModelPaginate<Application>>,
      string
    >({
      query: (query) => ({
        url: `/api/v1/all-applications?${query}`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    fetchApplicationByRecruiter: builder.query<
      IBackendRes<IModelPaginate<Application>>,
      string
    >({
      query: (query) => ({
        url: `/api/v1/applications?${query}`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    fetchApplicationByApplicant: builder.query<
      IBackendRes<IModelPaginate<Application>>,
      void
    >({
      query: () => ({
        url: `/api/v1/applications/by-applicant`,
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
  useFetchApplicationQuery,
  useFetchApplicationByRecruiterQuery,
  useFetchApplicationByApplicantQuery,
} = applicationApi;
