import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Permission } from "@/types/model";

// Create Permission
export type CreatePermissionRequest = Permission;

export type CreatePermissionResponse = IBackendRes<Permission>;

// Update Permission
export type UpdatePermissionRequest = {
  permissionId: string;
  permission: Permission;
};

export type UpdatePermissionResponse = IBackendRes<Permission>;

// Delete Permission
export type DeletePermissionRequest = string; // permissionId

export type DeletePermissionResponse = IBackendRes<Permission>;

// Fetch Permissions (with pagination)
export type FetchPermissionsRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  keyword?: string;
  module?: string;
  method?: string;
  apiPath?: string;
};

export type FetchPermissionsResponse = IBackendRes<IModelPaginate<Permission>>;

// Fetch Permission By Id
export type FetchPermissionByIdRequest = string; // permissionId

export type FetchPermissionByIdResponse = IBackendRes<Permission>;
