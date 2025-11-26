import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  CreateRecruiterRequest,
  CreateRecruiterResponse,
  DeleteRecruiterRequest,
  DeleteRecruiterResponse, FetchCurrentRecruiterResponse,
  FetchRecruiterByIdRequest,
  FetchRecruiterByIdResponse,
  FetchRecruitersRequest,
  FetchRecruitersResponse,
  UpdateRecruiterRequest,
  UpdateRecruiterResponse
} from "./recruiterType";

export const recruiterApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRecruiter: builder.mutation<
      CreateRecruiterResponse,
      CreateRecruiterRequest
    >({
      query: (data) => ({
        url: "/recruiters",
        method: "POST",
        data: { ...data, type: "recruiter" }
      }),
      invalidatesTags: ["Recruiter"]
    }),

    updateRecruiter: builder.mutation<
      UpdateRecruiterResponse,
      UpdateRecruiterRequest
    >({
      query: (data) => ({
        url: `/recruiters`,
        method: "PUT",
        data
      }),
      invalidatesTags: ["Recruiter", "Account"]
    }),

    deleteRecruiter: builder.mutation<
      DeleteRecruiterResponse,
      DeleteRecruiterRequest
    >({
      query: (recruiterId) => ({
        url: `/recruiters/${recruiterId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Recruiter"]

    }),

    // For Admin - Fetch all recruiters (enabled & disabled)
    fetchRecruiters: builder.query<
      FetchRecruitersResponse,
      FetchRecruitersRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["fullName", "address", "enabled"],
          textSearchFields: ["fullName", "address"], // Dùng LIKE search
          defaultSort: "createdAt,desc",
          sortableFields: ["fullName", "createdAt", "updatedAt"]
        });

        return {
          url: "/recruiters",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Recruiter"]
    }),

    // For Client - Fetch only enabled recruiters
    fetchAvailableRecruiters: builder.query<
      FetchRecruitersResponse,
      Omit<FetchRecruitersRequest, "enabled">
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            enabled: true // Force enabled = true
          },
          filterFields: ["fullName", "address", "enabled"],
          textSearchFields: ["fullName", "address"],
          defaultSort: "createdAt,desc",
          sortableFields: ["fullName", "createdAt", "updatedAt"]
        });

        return {
          url: "/recruiters",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Recruiter"]
    }),

    fetchRecruiterById: builder.query<
      FetchRecruiterByIdResponse,
      FetchRecruiterByIdRequest
    >({
      query: (recruiterId) => ({
        url: `/recruiters/${recruiterId}`,
        method: "GET"
      }),
      providesTags: ["Recruiter"]
    }),

    fetchCurrentRecruiter: builder.query<FetchCurrentRecruiterResponse, void>({
      query: () => ({
        url: `/recruiters/me`,
        method: "GET"
      }),
      providesTags: ["Recruiter"]
    })
  })
});

export const {
  useCreateRecruiterMutation,
  useUpdateRecruiterMutation,
  useDeleteRecruiterMutation,
  useFetchRecruitersQuery,
  useFetchAvailableRecruitersQuery,
  useFetchRecruiterByIdQuery,
  useFetchCurrentRecruiterQuery
} = recruiterApi;
