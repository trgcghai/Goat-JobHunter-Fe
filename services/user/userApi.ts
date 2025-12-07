import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  CheckRecruitersFollowedResponse,
  CheckSavedJobsRequest,
  CheckSavedJobsResponse, CreateUserRequest,
  FetchUserByEmailResponse,
  FetchUsersRequest,
  FetchUsersResponse,
  FollowRecruitersRequest,
  FollowRecruitersResponse,
  GetFollowedRecruitersResponse,
  GetSavedJobsResponse,
  JobIdsRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SaveJobsResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UserIdsRequest, UserMutationResponse,
  UserStatusResponse
} from "./userType";

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchUsers: builder.query<FetchUsersResponse, FetchUsersRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["email", "phone", "role", "enabled"],
          textSearchFields: ["email", "phone"],
          nestedFields: {
            role: "role.name",
            email: "contact.email",
            phone: "contact.phone"
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["createdAt", "updatedAt"]
        });

        return {
          url: "/users",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["User"]
    }),

    fetchUserById: builder.query({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "GET"
      }),
      providesTags: (result, error, userId) => [{ type: "User", id: userId }]
    }),

    fetchUserByEmail: builder.query<FetchUserByEmailResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    createUser: builder.mutation<UserMutationResponse, CreateUserRequest>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        data
      }),
      invalidatesTags: ["User"]
    }),

    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (data) => ({
        url: "/users/update-password",
        method: "PUT",
        data
      })
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/users/reset-password",
        method: "PUT",
        data
      })
    }),

    // Saved Jobs APIs
    getSavedJobs: builder.query<GetSavedJobsResponse, void>({
      query: () => ({
        url: "/users/me/saved-jobs",
        method: "GET"
      }),
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.result.map((job) => ({
              type: "SavedJob" as const,
              id: job.jobId
            })),
            { type: "SavedJob", id: "LIST" }
          ]
          : [{ type: "SavedJob", id: "LIST" }]
    }),

    checkSavedJobs: builder.query<
      CheckSavedJobsResponse,
      CheckSavedJobsRequest
    >({
      query: (params) => ({
        url: "/users/me/saved-jobs/contains",
        method: "GET",
        params: { jobIds: params.jobIds }
      }),
      providesTags: (_, __, arg) =>
        arg.jobIds
          ? arg.jobIds.map((jobId) => ({
            type: "SavedJob" as const,
            id: jobId
          }))
          : []
    }),

    saveJobs: builder.mutation<SaveJobsResponse, JobIdsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "PUT",
        data
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "SavedJob", id: "LIST" },
        ...arg.jobIds.map((jobId) => ({
          type: "SavedJob" as const,
          id: jobId
        }))
      ]
    }),

    unsaveJobs: builder.mutation<SaveJobsResponse, JobIdsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "DELETE",
        data
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "SavedJob", id: "LIST" },
        ...arg.jobIds.map((jobId) => ({
          type: "SavedJob" as const,
          id: jobId
        }))
      ]
    }),

    // Follow Recruiters APIs
    getFollowedRecruiters: builder.query<GetFollowedRecruitersResponse, void>({
      query: () => ({
        url: "/users/me/followed-recruiters",
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    checkRecruitersFollowed: builder.query<
      CheckRecruitersFollowedResponse,
      FollowRecruitersRequest
    >({
      query: ({ recruiterIds }) => ({
        url: "/users/me/followed-recruiters/contains",
        params: { recruiterIds }
      }),
      providesTags: ["User"]
    }),

    followRecruiters: builder.mutation<
      FollowRecruitersResponse,
      FollowRecruitersRequest
    >({
      query: (data) => ({
        url: "/users/me/followed-recruiters",
        method: "PUT",
        data
      }),
      invalidatesTags: ["User"]
    }),

    unfollowRecruiters: builder.mutation<
      FollowRecruitersResponse,
      FollowRecruitersRequest
    >({
      query: (data) => ({
        url: "/users/me/followed-recruiters",
        method: "DELETE",
        data
      }),
      invalidatesTags: ["User"]
    }),

    // User Status APIs
    activateUsers: builder.mutation<UserStatusResponse, UserIdsRequest>({
      query: (data) => ({
        url: "/users/activate",
        method: "PUT",
        data
      }),
      invalidatesTags: ["User", "Recruiter", "Applicant"]
    }),

    deactivateUsers: builder.mutation<UserStatusResponse, UserIdsRequest>({
      query: (data) => ({
        url: "/users/deactivate",
        method: "PUT",
        data
      }),
      invalidatesTags: ["User", "Recruiter", "Applicant"]
    })
  })
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useFetchUserByEmailQuery,
  useCreateUserMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useGetSavedJobsQuery,
  useCheckSavedJobsQuery,
  useSaveJobsMutation,
  useUnsaveJobsMutation,
  useGetFollowedRecruitersQuery,
  useCheckRecruitersFollowedQuery,
  useFollowRecruitersMutation,
  useUnfollowRecruitersMutation,
  useActivateUsersMutation,
  useDeactivateUsersMutation
} = userApi;