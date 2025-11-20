import { api } from "@/services/api";
import type {
  CheckSavedJobsRequest,
  CheckSavedJobsResponse,
  FetchUserByEmailResponse,
  FetchUsersRequest,
  FetchUsersResponse,
  FollowRecruitersRequest,
  FollowRecruitersResponse,
  GetSavedJobsResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SaveJobsRequest,
  SaveJobsResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from "./userType";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<FetchUsersResponse, FetchUsersRequest>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    fetchUserByEmail: builder.mutation<FetchUserByEmailResponse, void>({
      query: () => ({
        url: "/users",
        method: "POST",
      }),
    }),

    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (data) => ({
        url: "/users/update-password",
        method: "PUT",
        data,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/users/reset-password",
        method: "PUT",
        data,
      }),
    }),

    getSavedJobs: builder.query<GetSavedJobsResponse, void>({
      query: () => ({
        url: "/users/me/saved-jobs",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    checkSavedJobs: builder.query<
      CheckSavedJobsResponse,
      CheckSavedJobsRequest
    >({
      query: (params) => ({
        url: "/users/me/saved-jobs/contains",
        method: "GET",
        params: { jobIds: params.jobIds },
      }),
      providesTags: ["User"],
    }),

    saveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["User"],
    }),

    unsaveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["User"],
    }),

    followRecruiters: builder.mutation<
      FollowRecruitersResponse,
      FollowRecruitersRequest
    >({
      query: ({ userId, followedRecruiters }) => {
        const payload = followedRecruiters.map((fr) => ({
          userId: fr.userId,
          type: "recruiter",
        }));
        return {
          url: "/users/followed-recruiters",
          method: "PUT",
          data: { userId, followedRecruiters: payload },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByEmailMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useGetSavedJobsQuery,
  useCheckSavedJobsQuery,
  useSaveJobsMutation,
  useUnsaveJobsMutation,
  useFollowRecruitersMutation,
} = userApi;
