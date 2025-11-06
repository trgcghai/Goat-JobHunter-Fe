import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Role } from "@/types/model";

export const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation<IBackendRes<Role>, Role>({
      query: (role) => ({
        url: "/api/v1/roles",
        method: "POST",
        data: role,
      }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<
      IBackendRes<Role>,
      { role: Role; roleId: string }
    >({
      query: ({ roleId, role }) => ({
        url: "/api/v1/roles",
        method: "PUT",
        data: { roleId, ...role },
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<IBackendRes<Role>, string>({
      query: (roleId) => ({
        url: `/api/v1/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    fetchRole: builder.query<IBackendRes<IModelPaginate<Role>>, string>({
      query: (query) => ({ url: `/api/v1/roles?${query}`, method: "GET" }),
      providesTags: ["Role"],
    }),

    fetchRoleById: builder.query<IBackendRes<Role>, string>({
      query: (roleId) => ({ url: `/api/v1/roles/${roleId}`, method: "GET" }),
      providesTags: ["Role"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useFetchRoleQuery,
  useFetchRoleByIdQuery,
} = roleApi;
