import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CreatePermissionRequest,
  FetchPermissionByIdResponse,
  FetchPermissionsRequest,
  FetchPermissionsResponse,
  PermissionIdRequest,
  PermissionMutationResponse,
  UpdatePermissionRequest
} from "./permissionType";

export const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation<
      PermissionMutationResponse,
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
      PermissionMutationResponse,
      UpdatePermissionRequest
    >({
      query: (data) => ({
        url: "/permissions",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Permission"]
    }),

    deletePermission: builder.mutation<
      PermissionMutationResponse,
      PermissionIdRequest
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
          textSearchFields: ["module", "name"],
          defaultSort: "createdAt,desc",
          sortableFields: ["createdAt", "updatedAt"]
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
      PermissionIdRequest
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