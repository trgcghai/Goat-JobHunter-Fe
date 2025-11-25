import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CreateJobRequest,
  CreateJobResponse,
  DeleteJobRequest,
  DeleteJobResponse,
  FetchJobByCurrentRecruiterRequest,
  FetchJobByIdRequest,
  FetchJobByIdResponse,
  FetchJobByRecruiterRequest,
  FetchJobsRequest,
  FetchJobsResponse,
  ToggleJobActiveRequest,
  ToggleJobActiveResponse,
  UpdateJobRequest,
  UpdateJobResponse,
} from "./jobType";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<CreateJobResponse, CreateJobRequest>({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        data: job,
      }),
      invalidatesTags: ["Job"],
    }),

    updateJob: builder.mutation<UpdateJobResponse, UpdateJobRequest>({
      query: ({ jobId, ...job }) => ({
        url: "/jobs",
        method: "PUT",
        data: { ...job, jobId },
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJob: builder.mutation<DeleteJobResponse, DeleteJobRequest>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),

    // Fetch jobs with advanced filtering, sorting, and pagination for administrators
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
          ],
          textSearchFields: ["title", "location"], // Dùng LIKE search
          nestedArrayFields: {
            skills: "skills.name", // Map skills -> skills.name
          },
          defaultSort: "updatedAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"],
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Job"],
    }),

    fetchJobById: builder.query<FetchJobByIdResponse, FetchJobByIdRequest>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    // Fetch available jobs (active = true) for applicants
    fetchJobsAvailable: builder.query<
      FetchJobsResponse,
      Omit<FetchJobsRequest, "active">
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            active: true, // Force active = true
          },
          filterFields: [
            "title",
            "location",
            "salary",
            "active",
            "level",
            "workingType",
          ],
          textSearchFields: ["title", "location"],
          nestedArrayFields: {
            skills: "skills.name",
          },
          defaultSort: "updatedAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"],
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Job"],
    }),

    // Fetch related jobs based on skills (active = true) for job detail page
    fetchRelatedJobs: builder.query<
      FetchJobsResponse,
      {
        skills: string[];
        page?: number;
        size?: number;
      }
    >({
      query: ({ skills, page = 1, size = 6 }) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            skills,
            active: true, // Only active jobs
            page,
            size,
          },
          filterFields: ["active"],
          nestedArrayFields: {
            skills: "skills.name",
          },
          defaultSort: "updatedAt,desc",
          sortableFields: ["updatedAt", "createdAt"],
        });

        return {
          url: "/jobs",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Job"],
    }),

    // fetch jobs by recruiter id
    fetchJobsByRecruiter: builder.query<
      FetchJobsResponse,
      FetchJobByRecruiterRequest
    >({
      query: ({ recruiterId, ...params }) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            active: true,
          },
          filterFields: ["title", "location", "salary", "level", "workingType"],
          textSearchFields: ["title", "location"], // Dùng LIKE search
          nestedArrayFields: {
            skills: "skills.name", // Map skills -> skills.name
          },
          defaultSort: "updatedAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"],
        });
        return {
          url: `/recruiters/${recruiterId}/jobs`,
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Job"],
    }),

    // fetch jobs by current login recruiter
    fetchJobsByCurrentRecruiter: builder.query<
      FetchJobsResponse,
      FetchJobByCurrentRecruiterRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            active: true,
          },
          filterFields: ["title", "location", "salary", "level", "workingType"],
          textSearchFields: ["title", "location"], // Dùng LIKE search
          nestedArrayFields: {
            skills: "skills.name", // Map skills -> skills.name
          },
          defaultSort: "updatedAt,desc",
          sortableFields: ["title", "salary", "createdAt", "updatedAt"],
        });

        return {
          url: `/recruiters/me/jobs`,
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Job"],
    }),

    // activate jobs
    activateJobs: builder.mutation<
      ToggleJobActiveResponse,
      ToggleJobActiveRequest
    >({
      query: (data) => ({
        url: "/jobs/activate",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Job"],
    }),

    // deactivate jobs
    deactivateJobs: builder.mutation<
      ToggleJobActiveResponse,
      ToggleJobActiveRequest
    >({
      query: (data) => ({
        url: "/jobs/deactivate",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
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
} = jobApi;
