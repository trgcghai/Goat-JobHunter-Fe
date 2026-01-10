import { api } from "@/services/api";
import type {
  CreateRoleRequest,
  FetchRoleByIdResponse,
  FetchRolesRequest,
  FetchRolesResponse,
  RoleMutationResponse,
  UpdateRoleRequest
} from "./roleType";

export const roleApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRole: builder.mutation<RoleMutationResponse, CreateRoleRequest>({
      query: (role) => ({
        url: "/roles",
        method: "POST",
        data: role
      }),
      invalidatesTags: ["Role"]
    }),

    updateRole: builder.mutation<RoleMutationResponse, UpdateRoleRequest>({
      query: (data) => ({
        url: "/roles",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Role"]
    }),

    activateRole: builder.mutation<RoleMutationResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}/activate`,
        method: "PUT"
      }),
      invalidatesTags: ["Role"]
    }),

    deactivateRole: builder.mutation<RoleMutationResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}/deactivate`,
        method: "PUT"
      }),
      invalidatesTags: ["Role"]
    }),

    deleteRole: builder.mutation<RoleMutationResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Role"]
    }),

    fetchRoles: builder.query<FetchRolesResponse, FetchRolesRequest>({
      query: (params) => ({
        url: "/roles",
        method: "GET",
        params
      }),
      providesTags: ["Role"]
    }),

    fetchRoleById: builder.query<FetchRoleByIdResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: "GET"
      }),
      providesTags: ["Role"]
    })
  })
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useActivateRoleMutation,
  useDeactivateRoleMutation,
  useDeleteRoleMutation,
  useFetchRolesQuery,
  useFetchRoleByIdQuery
} = roleApi;