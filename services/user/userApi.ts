import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CheckRecruitersFollowedResponse,
  CheckSavedJobsRequest,
  CheckSavedJobsResponse,
  FetchUserByEmailResponse,
  FetchUsersRequest,
  FetchUsersResponse,
  FollowRecruitersRequest,
  FollowRecruitersResponse,
  GetFollowedRecruitersResponse,
  GetSavedJobsResponse,
  JobIdsRequest,
  LatestNotificationsResponse,
  MarkNotificationsAsSeenResponse,
  NotificationPaginationRequest,
  NotificationPaginationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SaveJobsResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UserIdsRequest,
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

    fetchUserByEmail: builder.mutation<FetchUserByEmailResponse, void>({
      query: () => ({
        url: "/users",
        method: "POST"
      })
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
              ...result.data.map((job) => ({
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
      })
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

    // Notification APIs
    getUsersNotifications: builder.query<
      NotificationPaginationResponse,
      NotificationPaginationRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [],
          textSearchFields: [],
          nestedArrayFields: {},
          defaultSort: "createdAt,desc"
        });

        return {
          url: "/users/me/notifications",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Notifications"]
    }),

    getLatestNotifications: builder.query<LatestNotificationsResponse, void>({
      query: () => ({
        url: "/users/me/notifications/latest",
        method: "GET"
      }),
      providesTags: ["Notifications"]
    }),

    markNotificationsAsSeen: builder.mutation<
      MarkNotificationsAsSeenResponse,
      number[]
    >({
      query: (data) => ({
        url: "/users/me/notifications",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Notifications"]
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
  useFetchUserByEmailMutation,
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
  useGetUsersNotificationsQuery,
  useGetLatestNotificationsQuery,
  useMarkNotificationsAsSeenMutation,
  useActivateUsersMutation,
  useDeactivateUsersMutation
} = userApi;