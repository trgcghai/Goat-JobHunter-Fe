import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";
import { NotificationType } from "@/types/model";
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
  GetFollowedRecruiters,
  GetSavedJobsResponse,
  MarkNotificationsAsSeenResponse,
  NotificationPaginationRequest,
  NotificationPaginationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SaveJobsRequest,
  SaveJobsResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse
} from "./userType";

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchUsers: builder.query<FetchUsersResponse, FetchUsersRequest>({
      query: (params) => {

        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["email", "phone", "role", "enabled"],
          textSearchFields: ["email", "phone"], // Dùng LIKE search
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

    saveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
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

    unsaveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
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

    // Follow Recruiters APIs for current user
    // -- Followed recruiters --
    getFollowedRecruiters: builder.query<GetFollowedRecruiters, void>({
      query: () => ({
        url: "/users/me/followed-recruiters",
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    // Check if recruiters are followed. Pass recruiterIds: number[]
    checkRecruitersFollowed: builder.query<
      CheckRecruitersFollowedResponse,
      FollowRecruitersRequest
    >({
      query: ({ recruiterIds }) => ({
        url: "/users/me/followed-recruiters/contains",
        params: { recruiterIds } // array -> repeated param
      })
    }),

    // Follow recruiters (body: { recruiterIds: number[] }), returns UserResponse
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

    // Unfollow recruiters (DELETE with body { recruiterIds })
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

    // Notification APIs: mark as read, get, get latest
    // GET /users/me/notifications - Lấy notifications có phân trang
    getUsersNotifications: builder.query<
      NotificationPaginationResponse,
      NotificationPaginationRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [], // Không filter
          textSearchFields: [], // Không dùng LIKE search
          nestedArrayFields: {}, // Không có nested array
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

    // GET /users/me/notifications/latest - Lấy 10 notifications mới nhất
    getLatestNotifications: builder.query<
      IBackendRes<NotificationType[]>,
      void
    >({
      query: () => ({
        url: "/users/me/notifications/latest",
        method: "GET"
      }),
      providesTags: ["Notifications"]
    }),

    // PUT /users/me/notifications - Đánh dấu notifications đã xem
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

    // activate users - set enabled to true
    activateUsers: builder.mutation({
      query: (userIds: number[]) => ({
        url: "/users/activate",
        method: "PUT",
        data: { userIds }
      }),
      invalidatesTags: ["User", "Recruiter", "Applicant"]
    }),

    // deactivate users - set enabled to false
    deactivateUsers: builder.mutation({
      query: (userIds: number[]) => ({
        url: "/users/deactivate",
        method: "PUT",
        data: { userIds }
      }),
      invalidatesTags: ["User", "Recruiter", "Applicant"]
    })
  })
});

export const {
  // hooks for user information endpoints
  useFetchUsersQuery,
  useFetchUserByEmailMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,

  // hooks for saved jobs endpoints
  useGetSavedJobsQuery,
  useCheckSavedJobsQuery,
  useSaveJobsMutation,
  useUnsaveJobsMutation,

  // hooks for follow recruiters endpoints
  useGetFollowedRecruitersQuery,
  useCheckRecruitersFollowedQuery,
  useFollowRecruitersMutation,
  useUnfollowRecruitersMutation,

  // hooks for user's notifications endpoints
  useGetUsersNotificationsQuery,
  useGetLatestNotificationsQuery,
  useMarkNotificationsAsSeenMutation,

  useActivateUsersMutation,
  useDeactivateUsersMutation
} = userApi;
