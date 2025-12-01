import { api } from "@/services/api";
import type {
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleResponse,
  FetchRoleByIdResponse,
  FetchRolesRequest,
  FetchRolesResponse,
  UpdateRoleResponse,
} from "./roleType";
import type { Role } from "@/types/model";

export const roleApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRole: builder.mutation<CreateRoleResponse, CreateRoleRequest>({
      query: (role) => ({
        url: "/roles",
        method: "POST",
        data: role,
      }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<UpdateRoleResponse, Role>({
      query: (data) => ({
        url: "/roles",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Role"],
    }),

    activateRole: builder.mutation({
      query: (roleId: number) => ({
        url: `/roles/${roleId}/activate`,
        method: "PUT",
      }),
      invalidatesTags: ["Role"],
    }),

    deactivateRole: builder.mutation({
      query: (roleId: number) => ({
        url: `/roles/${roleId}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<DeleteRoleResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    fetchRoles: builder.query<FetchRolesResponse, FetchRolesRequest>({
      query: (params) => ({
        url: "/roles",
        method: "GET",
        params,
      }),
      providesTags: ["Role"],
    }),

    fetchRoleById: builder.query<FetchRoleByIdResponse, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useActivateRoleMutation,
  useDeactivateRoleMutation,
  useDeleteRoleMutation,
  useFetchRolesQuery,
  useFetchRoleByIdQuery,
} = roleApi;
