import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Job } from "@/types/model";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<IBackendRes<Job>, Job>({
      query: (job) => ({
        url: "/api/v1/jobs",
        method: "POST",
        data: job,
      }),
      invalidatesTags: ["Job"],
    }),

    updateJob: builder.mutation<IBackendRes<Job>, { job: Job; jobId: string }>({
      query: ({ jobId, job }) => ({
        url: "/api/v1/jobs",
        method: "PUT",
        data: { jobId, ...job },
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJob: builder.mutation<IBackendRes<Job>, string>({
      query: (jobId) => ({
        url: `/api/v1/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),

    fetchJob: builder.query<IBackendRes<IModelPaginate<Job>>, string>({
      query: (query) => ({ url: `/api/v1/jobs?${query}`, method: "GET" }),
      providesTags: ["Job"],
    }),

    fetchJobById: builder.query<IBackendRes<Job>, string>({
      query: (jobId) => ({ url: `/api/v1/jobs/${jobId}`, method: "GET" }),
      providesTags: ["Job"],
    }),

    countJobByRecruiter: builder.query<IBackendRes<unknown>, void>({
      query: () => ({ url: "/api/v1/jobs/recruiters", method: "GET" }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useFetchJobQuery,
  useFetchJobByIdQuery,
  useCountJobByRecruiterQuery,
} = jobApi;
