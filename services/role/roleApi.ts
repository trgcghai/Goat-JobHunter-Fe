import { api } from "@/services/api";
import type {
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleRequest,
  DeleteRoleResponse,
  FetchRoleByIdRequest,
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
        url: "/api/v1/roles",
        method: "POST",
        data: role,
      }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<UpdateRoleResponse, UpdateRoleRequest>({
      query: ({ roleId, role }) => ({
        url: "/api/v1/roles",
        method: "PUT",
        data: { roleId, ...role },
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<DeleteRoleResponse, DeleteRoleRequest>({
      query: (roleId) => ({
        url: `/api/v1/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    fetchRoles: builder.query<FetchRolesResponse, FetchRolesRequest>({
      query: (params) => ({
        url: "/api/v1/roles",
        method: "GET",
        params,
      }),
      providesTags: ["Role"],
    }),

    fetchRoleById: builder.query<FetchRoleByIdResponse, FetchRoleByIdRequest>({
      query: (roleId) => ({
        url: `/api/v1/roles/${roleId}`,
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
