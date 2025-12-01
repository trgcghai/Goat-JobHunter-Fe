import { api } from "@/services/api";
import type {
  CreatePermissionRequest,
  CreatePermissionResponse,
  DeletePermissionResponse,
  FetchPermissionByIdRequest,
  FetchPermissionByIdResponse,
  FetchPermissionsRequest,
  FetchPermissionsResponse,
  UpdatePermissionResponse
} from "./permissionType";
import { Permission } from "@/types/model";
import { buildSpringQuery } from "@/utils/buildSpringQuery";

export const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation<
      CreatePermissionResponse,
      CreatePermissionRequest
    >({
      query: (permission) => ({
        url: "/permissions",
        method: "POST",
        data: permission
      }),
      invalidatesTags: ["Permission"]
    }),

    updatePermission: builder.mutation<
      UpdatePermissionResponse,
      Permission
    >({
      query: (data) => ({
        url: "/permissions",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Permission"]
    }),

    deletePermission: builder.mutation<
      DeletePermissionResponse,
      number
    >({
      query: (permissionId) => ({
        url: `/permissions/${permissionId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Permission"]
    }),

    fetchPermissions: builder.query<
      FetchPermissionsResponse,
      FetchPermissionsRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["module", "name", "method"],
          textSearchFields: ["module", "name"], // LIKE search
          defaultSort: "createdAt,desc",
          sortableFields: ["createdAt", "updatedAt"],
        });

        return {
          url: "/permissions",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Permission"]
    }),

    fetchPermissionById: builder.query<
      FetchPermissionByIdResponse,
      FetchPermissionByIdRequest
    >({
      query: (permissionId) => ({
        url: `/permissions/${permissionId}`,
        method: "GET"
      }),
      providesTags: ["Permission"]
    })
  })
});

export const {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useFetchPermissionsQuery,
  useFetchPermissionByIdQuery
} = permissionApi;
