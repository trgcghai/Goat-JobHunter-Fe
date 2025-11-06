import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Account, FullUser, User } from "@/types/model";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IBackendRes<IModelPaginate<User>>, string>({
      query: (query) => ({ url: `/api/v1/users?${query}`, method: "GET" }),
      providesTags: ["User"],
    }),

    fetchUserByEmail: builder.mutation<IBackendRes<FullUser>, void>({
      query: () => ({ url: "/api/v1/users", method: "POST" }),
    }),

    updatePassword: builder.mutation<
      IBackendRes<Account>,
      { currentPassword: string; newPassword: string; rePassword: string }
    >({
      query: (data) => ({
        url: "/api/v1/users/update-password",
        method: "PUT",
        data,
      }),
    }),

    resetPassword: builder.mutation<
      IBackendRes<unknown>,
      { email: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/api/v1/users/reset-password",
        method: "PUT",
        data,
      }),
    }),

    saveJobs: builder.mutation<
      IBackendRes<User>,
      { userId: number; savedJobs: { jobId: number }[] }
    >({
      query: (data) => ({
        url: "/api/v1/users/saved-jobs",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["User"],
    }),

    followRecruiters: builder.mutation<
      IBackendRes<User>,
      { userId: number; followedRecruiters: { userId: number }[] }
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
  useFetchUserQuery,
  useFetchUserByEmailMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useSaveJobsMutation,
  useFollowRecruitersMutation,
} = userApi;
