import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Role } from "@/types/model";

// Create Role
export type CreateRoleRequest = Role;

export type CreateRoleResponse = IBackendRes<Role>;

// Update Role
export type UpdateRoleRequest = {
  roleId: string;
  role: Role;
};

export type UpdateRoleResponse = IBackendRes<Role>;

// Delete Role
export type DeleteRoleRequest = string; // roleId

export type DeleteRoleResponse = IBackendRes<Role>;

// Fetch Roles (with pagination)
export type FetchRolesRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  keyword?: string;
  active?: boolean;
};

export type FetchRolesResponse = IBackendRes<IModelPaginate<Role>>;

// Fetch Role By Id
export type FetchRoleByIdRequest = string; // roleId

export type FetchRoleByIdResponse = IBackendRes<Role>;
