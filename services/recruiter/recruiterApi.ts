import { api } from "@/services/api";
import type {
  CreateRecruiterRequest,
  CreateRecruiterResponse,
  DeleteRecruiterRequest,
  DeleteRecruiterResponse,
  FetchRecruiterByIdRequest,
  FetchRecruiterByIdResponse,
  FetchRecruitersRequest,
  FetchRecruitersResponse,
  UpdateRecruiterRequest,
  UpdateRecruiterResponse,
} from "./recruiterType";

export const recruiterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRecruiter: builder.mutation<
      CreateRecruiterResponse,
      CreateRecruiterRequest
    >({
      query: (data) => ({
        url: "/recruiters",
        method: "POST",
        data: { ...data, type: "recruiter" },
      }),
      invalidatesTags: ["Recruiter"],
    }),

    updateRecruiter: builder.mutation<
      UpdateRecruiterResponse,
      UpdateRecruiterRequest
    >({
      query: ({ recruiterId, ...data }) => ({
        url: "/recruiters",
        method: "PUT",
        data: { userId: recruiterId, ...data, type: "recruiter" },
      }),
      invalidatesTags: ["Recruiter"],
    }),

    deleteRecruiter: builder.mutation<
      DeleteRecruiterResponse,
      DeleteRecruiterRequest
    >({
      query: (recruiterId) => ({
        url: `/recruiters/${recruiterId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recruiter"],
    }),

    fetchRecruiters: builder.query<
      FetchRecruitersResponse,
      FetchRecruitersRequest
    >({
      query: (params) => ({
        url: "/recruiters",
        method: "GET",
        params,
      }),
      providesTags: ["Recruiter"],
    }),

    fetchRecruiterById: builder.query<
      FetchRecruiterByIdResponse,
      FetchRecruiterByIdRequest
    >({
      query: (recruiterId) => ({
        url: `/recruiters/${recruiterId}`,
        method: "GET",
      }),
      providesTags: ["Recruiter"],
    }),
  }),
});

export const {
  useCreateRecruiterMutation,
  useUpdateRecruiterMutation,
  useDeleteRecruiterMutation,
  useFetchRecruitersQuery,
  useFetchRecruiterByIdQuery,
} = recruiterApi;
