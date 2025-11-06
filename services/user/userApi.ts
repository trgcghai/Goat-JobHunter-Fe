import { api } from "@/services/api";
import type {
  FetchUserByEmailResponse,
  FetchUsersRequest,
  FetchUsersResponse,
  FollowRecruitersRequest,
  FollowRecruitersResponse,
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
        url: "/api/v1/users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    fetchUserByEmail: builder.mutation<FetchUserByEmailResponse, void>({
      query: () => ({
        url: "/api/v1/users",
        method: "POST",
      }),
    }),

    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (data) => ({
        url: "/api/v1/users/update-password",
        method: "PUT",
        data,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/api/v1/users/reset-password",
        method: "PUT",
        data,
      }),
    }),

    saveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
      query: (data) => ({
        url: "/api/v1/users/saved-jobs",
        method: "PUT",
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
          url: "/api/v1/users/followed-recruiters",
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
  useSaveJobsMutation,
  useFollowRecruitersMutation,
} = userApi;
