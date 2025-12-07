import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  CreateRecruiterRequest,
  FetchCurrentRecruiterResponse,
  FetchRecruiterByIdResponse,
  FetchRecruitersRequest,
  FetchRecruitersResponse,
  RecruiterIdRequest,
  RecruiterMutationResponse,
  UpdateRecruiterRequest
} from "./recruiterType";

export const recruiterApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRecruiter: builder.mutation<
      RecruiterMutationResponse,
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
      RecruiterMutationResponse,
      UpdateRecruiterRequest
    >({
      query: (data) => ({
        url: `/recruiters`,
        method: "PUT",
        data
      }),
      invalidatesTags: ["Recruiter", "Account", "User"]
    }),

    deleteRecruiter: builder.mutation<
      RecruiterMutationResponse,
      RecruiterIdRequest
    >({
      query: (recruiterId) => ({
        url: `/recruiters/${recruiterId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Recruiter"]
    }),

    fetchRecruiters: builder.query<
      FetchRecruitersResponse,
      FetchRecruitersRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
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

    fetchAvailableRecruiters: builder.query<
      FetchRecruitersResponse,
      Omit<FetchRecruitersRequest, "enabled">
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params: {
            ...params,
            enabled: true
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
      RecruiterIdRequest
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