import { api } from "@/services/api";
import type {
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleRequest,
  DeleteRoleResponse,
  FetchRoleByIdResponse,
  FetchRolesRequest,
  FetchRolesResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from "./roleType";

export const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation<CreateRoleResponse, CreateRoleRequest>({
      query: (role) => ({
        url: "/roles",
        method: "POST",
        data: role,
      }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<UpdateRoleResponse, UpdateRoleRequest>({
      query: ({ roleId, ...role }) => ({
        url: "/roles",
        method: "PUT",
        data: { roleId, ...role },
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<DeleteRoleResponse, DeleteRoleRequest>({
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
  useDeleteRoleMutation,
  useFetchRolesQuery,
  useFetchRoleByIdQuery,
} = roleApi;
