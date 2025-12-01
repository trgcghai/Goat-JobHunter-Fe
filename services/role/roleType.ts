import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Role } from "@/types/model";

// Create Role
export type CreateRoleRequest = {
  name: string;
  description?: string;
};

export type CreateRoleResponse = IBackendRes<Role>;

// Update Role
export type UpdateRoleRequest = {
  roleId: number;
  role: Role;
};

export type UpdateRoleResponse = IBackendRes<Role>;

export type DeleteRoleResponse = IBackendRes<Role>;

// Fetch Roles (with pagination)
export type FetchRolesRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  keyword?: string;
  active?: boolean;
};

export type FetchRolesResponse = IBackendRes<IModelPaginate<Role>>;

export type FetchRoleByIdResponse = IBackendRes<Role>;
