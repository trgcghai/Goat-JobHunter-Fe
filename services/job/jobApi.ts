import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  CreateJobRequest,
  FetchJobByCurrentRecruiterRequest,
  FetchJobByIdResponse,
  FetchJobByRecruiterRequest,
  FetchJobsRequest,
  FetchJobsResponse,
  FetchSuitableApplicantsRequest,
  FetchSuitableApplicantsResponse,
  JobApplicationCountResponse,
  JobIdRequest,
  JobIdsRequest,
  JobMutationResponse,
  ToggleJobActiveResponse,
  ToggleJobEnabledRequest,
  ToggleJobEnabledResponse,
  UpdateJobRequest
} from "./jobType";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<JobMutationResponse, CreateJobRequest>({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        data: job
      }),
      invalidatesTags: ["Job"]
    }),

    updateJob: builder.mutation<JobMutationResponse, UpdateJobRequest>({
      query: ({ jobId, ...job }) => ({
        url: "/jobs",
        method: "PUT",
        data: { ...job, jobId }
      }),
      invalidatesTags: ["Job"]
    }),

    deleteJob: builder.mutation<JobMutationResponse, JobIdRequest>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Job"]
    }),

    fetchJobs: builder.query<FetchJobsResponse, FetchJobsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [
            "title",
            "location",
            "salary",
            "active",
            "level",
            "workingType",
            "enabled"
          ],
          textSearchFields: ["title", "location"],
          nestedArrayFields: {
            skills: "skills.name"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"]
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job"]
    }),

    fetchJobById: builder.query<FetchJobByIdResponse, JobIdRequest>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "GET"
      }),
      providesTags: ["Job"]
    }),

    fetchJobsAvailable: builder.query<
      FetchJobsResponse,
      Omit<FetchJobsRequest, "active">
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            active: true,
            enabled: true
          },
          filterFields: [
            "title",
            "location",
            "salary",
            "active",
            "level",
            "workingType",
            "enabled"
          ],
          textSearchFields: ["title", "location"],
          nestedArrayFields: {
            skills: "skills.skillId"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"]
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job"]
    }),

    fetchRelatedJobs: builder.query<
      FetchJobsResponse,
      {
        skills: number[];
        page?: number;
        size?: number;
      }
    >({
      query: ({ skills, page = 1, size = 6 }) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            skills,
            active: true,
            page,
            size
          },
          filterFields: ["active"],
          nestedArrayFields: {
            skills: "skills.skillId"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["updatedAt", "createdAt"]
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job"]
    }),

    fetchJobsByRecruiter: builder.query<
      FetchJobsResponse,
      FetchJobByRecruiterRequest
    >({
      query: ({ recruiterId, ...params }) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [
            "title",
            "location",
            "salary",
            "level",
            "workingType",
            "active"
          ],
          textSearchFields: ["title", "location"],
          nestedArrayFields: {
            skills: "skills.name"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"]
        });
        return {
          url: `/recruiters/${recruiterId}/jobs`,
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job"]
    }),

    fetchJobsByCurrentRecruiter: builder.query<
      FetchJobsResponse,
      FetchJobByCurrentRecruiterRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [
            "title",
            "location",
            "salary",
            "level",
            "workingType",
            "active"
          ],
          textSearchFields: ["title", "location"],
          nestedArrayFields: {
            skills: "skills.name"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"]
        });

        return {
          url: `/recruiters/me/jobs`,
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job"]
    }),

    activateJobs: builder.mutation<ToggleJobActiveResponse, JobIdsRequest>({
      query: (data) => ({
        url: "/jobs/activate",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Job"]
    }),

    deactivateJobs: builder.mutation<ToggleJobActiveResponse, JobIdsRequest>({
      query: (data) => ({
        url: "/jobs/deactivate",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Job"]
    }),

    enabledJobs: builder.mutation<ToggleJobEnabledResponse, ToggleJobEnabledRequest>({
      query: (data) => ({
        url: "/jobs/enabled",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Job"]
    }),

    disabledJobs: builder.mutation<ToggleJobEnabledResponse, ToggleJobEnabledRequest>({
      query: (data) => ({
        url: "/jobs/disabled",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Job"]
    }),

    countApplications: builder.query<
      JobApplicationCountResponse,
      JobIdsRequest
    >({
      query: ({ jobIds }) => {
        return {
          url: "/jobs/count-applications",
          method: "GET",
          params: {
            jobIds: jobIds.join(",")
          }
        };
      },
      providesTags: ["Job"]
    }),

    fetchApplicantsSuitableForJob: builder.query<
      FetchSuitableApplicantsResponse,
      FetchSuitableApplicantsRequest
    >({
      query: ({ jobId, ...params }) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["fullName", "email"],
          textSearchFields: ["fullName", "email"],
          nestedFields: {
            email: "contact.email"
          },
          defaultSort: "createdAt,desc"
        });

        return {
          url: `/jobs/${jobId}/applicants`,
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Job", "Applicant"]
    })
  })
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useFetchJobsQuery,
  useFetchJobByIdQuery,
  useFetchJobsAvailableQuery,
  useFetchRelatedJobsQuery,
  useFetchJobsByRecruiterQuery,
  useFetchJobsByCurrentRecruiterQuery,
  useActivateJobsMutation,
  useDeactivateJobsMutation,
  useEnabledJobsMutation,
  useDisabledJobsMutation,
  useCountApplicationsQuery,
  useFetchApplicantsSuitableForJobQuery
} = jobApi;