import { api } from "@/services/api";
import { IBackendRes } from "@/types/api";
import { NotificationType } from "@/types/model";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CheckSavedJobsRequest,
  CheckSavedJobsResponse,
  FetchUserByEmailResponse,
  FetchUsersRequest,
  FetchUsersResponse,
  FollowRecruitersRequest,
  FollowRecruitersResponse,
  GetSavedJobsResponse,
  MarkNotificationsAsSeenRequest,
  MarkNotificationsAsSeenResponse,
  NotificationPaginationRequest,
  NotificationPaginationResponse,
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

    // Saved Jobs APIs
    getSavedJobs: builder.query<GetSavedJobsResponse, void>({
      query: () => ({
        url: "/users/me/saved-jobs",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((job) => ({
                type: "SavedJob" as const,
                id: job.jobId,
              })),
              { type: "SavedJob", id: "LIST" },
            ]
          : [{ type: "SavedJob", id: "LIST" }],
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
      providesTags: (_, __, arg) =>
        arg.jobIds
          ? arg.jobIds.map((jobId) => ({
              type: "SavedJob" as const,
              id: jobId,
            }))
          : [],
    }),

    saveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "PUT",
        data,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "SavedJob", id: "LIST" },
        ...arg.jobIds.map((jobId) => ({
          type: "SavedJob" as const,
          id: jobId,
        })),
      ],
    }),

    unsaveJobs: builder.mutation<SaveJobsResponse, SaveJobsRequest>({
      query: (data) => ({
        url: "/users/me/saved-jobs",
        method: "DELETE",
        data,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "SavedJob", id: "LIST" },
        ...arg.jobIds.map((jobId) => ({
          type: "SavedJob" as const,
          id: jobId,
        })),
      ],
    }),

    // Follow Recruiters API
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
          defaultSort: "createdAt,desc",
        });

        return {
          url: "/users/me/notifications",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Notifications"],
    }),

    // GET /users/me/notifications/latest - Lấy 10 notifications mới nhất
    getLatestNotifications: builder.query<
      IBackendRes<NotificationType[]>,
      void
    >({
      query: () => ({
        url: "/users/me/notifications/latest",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // PUT /users/me/notifications - Đánh dấu notifications đã xem
    markNotificationsAsSeen: builder.mutation<
      MarkNotificationsAsSeenResponse,
      MarkNotificationsAsSeenRequest
    >({
      query: (body) => ({
        url: "/users/me/notifications",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Notifications"],
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
  useGetUsersNotificationsQuery,
  useGetLatestNotificationsQuery,
  useMarkNotificationsAsSeenMutation,
} = userApi;
