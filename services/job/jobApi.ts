import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CountJobByRecruiterResponse,
  CreateJobRequest,
  CreateJobResponse,
  DeleteJobRequest,
  DeleteJobResponse,
  FetchJobByIdRequest,
  FetchJobByIdResponse,
  FetchJobsRequest,
  FetchJobsResponse,
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
      query: ({ jobId, job }) => ({
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

    countJobByRecruiter: builder.query<CountJobByRecruiterResponse, void>({
      query: () => ({
        url: "/jobs/recruiters",
        method: "GET",
      }),
    }),

    // New endpoint: Fetch available jobs (active = true) for applicants
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

    // New endpoint: Fetch related jobs based on skills (active = true) for job detail page
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
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useFetchJobsQuery,
  useFetchJobByIdQuery,
  useCountJobByRecruiterQuery,
  useFetchJobsAvailableQuery,
  useFetchRelatedJobsQuery,
} = jobApi;
