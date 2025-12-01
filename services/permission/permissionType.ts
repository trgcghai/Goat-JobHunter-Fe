import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Permission } from "@/types/model";

// Create Permission
export type CreatePermissionRequest = {
  name: string;
  module: string;
  method: string;
  apiPath: string;
};

export type CreatePermissionResponse = IBackendRes<Permission>;

export type UpdatePermissionResponse = IBackendRes<Permission>;

export type DeletePermissionResponse = IBackendRes<Permission>;

// Fetch Permissions (with pagination)
export type FetchPermissionsRequest = {
  page?: number;
  size?: number;
  name?: string;
  module?: string;
  method?: string;
};

export type FetchPermissionsResponse = IBackendRes<IModelPaginate<Permission>>;

// Fetch Permission By Id
export type FetchPermissionByIdRequest = string; // permissionId

export type FetchPermissionByIdResponse = IBackendRes<Permission>;
