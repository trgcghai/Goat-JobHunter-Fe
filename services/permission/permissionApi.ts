import { api } from "@/services/api";
import type {
  CreatePermissionRequest,
  CreatePermissionResponse,
  DeletePermissionRequest,
  DeletePermissionResponse,
  FetchPermissionByIdRequest,
  FetchPermissionByIdResponse,
  FetchPermissionsRequest,
  FetchPermissionsResponse,
  UpdatePermissionRequest,
  UpdatePermissionResponse,
} from "./permissionType";

export const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation<
      CreatePermissionResponse,
      CreatePermissionRequest
    >({
      query: (permission) => ({
        url: "/permissions",
        method: "POST",
        data: permission,
      }),
      invalidatesTags: ["Permission"],
    }),

    updatePermission: builder.mutation<
      UpdatePermissionResponse,
      UpdatePermissionRequest
    >({
      query: ({ permissionId, permission }) => ({
        url: "/permissions",
        method: "PUT",
        data: { permissionId, ...permission },
      }),
      invalidatesTags: ["Permission"],
    }),

    deletePermission: builder.mutation<
      DeletePermissionResponse,
      DeletePermissionRequest
    >({
      query: (permissionId) => ({
        url: `/permissions/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Permission"],
    }),

    fetchPermissions: builder.query<
      FetchPermissionsResponse,
      FetchPermissionsRequest
    >({
      query: (params) => ({
        url: "/permissions",
        method: "GET",
        params,
      }),
      providesTags: ["Permission"],
    }),

    fetchPermissionById: builder.query<
      FetchPermissionByIdResponse,
      FetchPermissionByIdRequest
    >({
      query: (permissionId) => ({
        url: `/permissions/${permissionId}`,
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
  useFetchPermissionsQuery,
  useFetchPermissionByIdQuery,
} = permissionApi;
