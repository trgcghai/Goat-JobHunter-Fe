import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Permission } from "@/types/model";

export const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation<IBackendRes<Permission>, Permission>({
      query: (permission) => ({
        url: "/api/v1/permissions",
        method: "POST",
        data: permission,
      }),
      invalidatesTags: ["Permission"],
    }),

    updatePermission: builder.mutation<
      IBackendRes<Permission>,
      { permission: Permission; permissionId: string }
    >({
      query: ({ permissionId, permission }) => ({
        url: "/api/v1/permissions",
        method: "PUT",
        data: { permissionId, ...permission },
      }),
      invalidatesTags: ["Permission"],
    }),

    deletePermission: builder.mutation<IBackendRes<Permission>, string>({
      query: (permissionId) => ({
        url: `/api/v1/permissions/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Permission"],
    }),

    fetchPermission: builder.query<
      IBackendRes<IModelPaginate<Permission>>,
      string
    >({
      query: (query) => ({
        url: `/api/v1/permissions?${query}`,
        method: "GET",
      }),
      providesTags: ["Permission"],
    }),

    fetchPermissionById: builder.query<IBackendRes<Permission>, string>({
      query: (permissionId) => ({
        url: `/api/v1/permissions/${permissionId}`,
        method: "GET",
      }),
      providesTags: ["Permission"],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useFetchPermissionQuery,
  useFetchPermissionByIdQuery,
} = permissionApi;
