import { api } from '@/services/api';
import { buildSpringQuery } from '@/utils/buildSpringQuery';
import {
    CheckCompaniesFollowedResponse,
    CheckRecruitersFollowedResponse,
    CheckReviewedCompaniesResponse,
    CreateUserRequest,
    FetchUsersRequest,
    FetchUsersResponse,
    FollowCompaniesRequest,
    FollowCompaniesResponse,
    FollowRecruitersRequest,
    FollowRecruitersResponse,
    GetFollowedCompaniesResponse,
    GetFollowedRecruitersResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    ReviewedCompanyIdsRequest,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
    UserIdsRequest,
    UserMutationResponse,
    UserStatusResponse,
} from './userType';

export const userApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        fetchUsers: builder.query<FetchUsersResponse, FetchUsersRequest>({
            query: (params) => {
                const { params: queryParams } = buildSpringQuery({
                    params,
                    filterFields: ['email', 'phone', 'role', 'enabled'],
                    textSearchFields: ['email', 'phone'],
                    nestedFields: {
                        role: 'role.name',
                        email: 'contact.email',
                        phone: 'contact.phone',
                    },
                    defaultSort: 'createdAt,desc',
                    sortableFields: ['createdAt', 'updatedAt'],
                });

                return {
                    url: '/users',
                    method: 'GET',
                    params: queryParams,
                };
            },
            providesTags: ['User'],
        }),

        fetchUserById: builder.query({
            query: (userId: number) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
            providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
        }),

        createUser: builder.mutation<UserMutationResponse, CreateUserRequest>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
            query: (data) => ({
                url: '/users/update-password',
                method: 'PUT',
                data,
            }),
        }),

        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: (data) => ({
                url: '/users/reset-password',
                method: 'PUT',
                data,
            }),
        }),

        // Follow Recruiters APIs
        getFollowedRecruiters: builder.query<GetFollowedRecruitersResponse, void>({
            query: () => ({
                url: '/users/me/followed-recruiters',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        checkRecruitersFollowed: builder.query<CheckRecruitersFollowedResponse, FollowRecruitersRequest>({
            query: ({ recruiterIds }) => ({
                url: '/users/me/followed-recruiters/contains',
                params: { recruiterIds },
            }),
            providesTags: ['User'],
        }),

        followRecruiters: builder.mutation<FollowRecruitersResponse, FollowRecruitersRequest>({
            query: (data) => ({
                url: '/users/me/followed-recruiters',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        unfollowRecruiters: builder.mutation<FollowRecruitersResponse, FollowRecruitersRequest>({
            query: (data) => ({
                url: '/users/me/followed-recruiters',
                method: 'DELETE',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        // Follow Company APIs
        getFollowedCompanies: builder.query<GetFollowedCompaniesResponse, void>({
            query: () => ({
                url: '/users/me/followed-companies',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        checkCompaniesFollowed: builder.query<CheckCompaniesFollowedResponse, FollowCompaniesRequest>({
            query: ({ companyIds }) => ({
                url: '/users/me/followed-companies/contains',
                params: { companyIds },
            }),
            providesTags: ['User'],
        }),

        followCompanies: builder.mutation<FollowCompaniesResponse, FollowCompaniesRequest>({
            query: (data) => ({
                url: '/users/me/followed-companies',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        unfollowCompanies: builder.mutation<FollowCompaniesResponse, FollowCompaniesRequest>({
            query: (data) => ({
                url: '/users/me/followed-companies',
                method: 'DELETE',
                data,
            }),
            invalidatesTags: ['User'],
        }),

        checkReviewedCompanies: builder.query<CheckReviewedCompaniesResponse, ReviewedCompanyIdsRequest>({
            query: ({ companyIds }) => ({
                url: '/users/me/reviewed-companies/contains',
                params: { companyIds },
            }),
            providesTags: ['User'],
        }),

        // User Status APIs
        activateUsers: builder.mutation<UserStatusResponse, UserIdsRequest>({
            query: (data) => ({
                url: '/users/activate',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User', 'Recruiter', 'Applicant'],
        }),

        deactivateUsers: builder.mutation<UserStatusResponse, UserIdsRequest>({
            query: (data) => ({
                url: '/users/deactivate',
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['User', 'Recruiter', 'Applicant'],
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useFetchUserByIdQuery,

    useCreateUserMutation,
    useUpdatePasswordMutation,
    useResetPasswordMutation,

    useGetFollowedRecruitersQuery,
    useCheckRecruitersFollowedQuery,
    useFollowRecruitersMutation,
    useUnfollowRecruitersMutation,

    useGetFollowedCompaniesQuery,
    useCheckCompaniesFollowedQuery,
    useFollowCompaniesMutation,
    useUnfollowCompaniesMutation,

    useCheckReviewedCompaniesQuery,

    useActivateUsersMutation,
    useDeactivateUsersMutation,
} = userApi;
