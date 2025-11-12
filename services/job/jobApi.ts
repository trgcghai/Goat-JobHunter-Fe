import { api } from "@/services/api";
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

    fetchJobs: builder.query<FetchJobsResponse, FetchJobsRequest>({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
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
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useFetchJobsQuery,
  useFetchJobByIdQuery,
  useCountJobByRecruiterQuery,
} = jobApi;
