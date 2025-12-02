import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Skill } from "@/types/model";

// Base Request Types
export type SkillIdRequest = string;

export type SkillNameRequest = {
  name: string;
};

// Create & Update
export type CreateSkillRequest = SkillNameRequest;

export type UpdateSkillRequest = SkillNameRequest & {
  skillId: string;
};

// Fetch with Pagination
export type FetchSkillsRequest = {
  page?: number;
  size?: number;
  name?: string;
};

// Response Types
export type SkillMutationResponse = IBackendRes<Skill>;

export type FetchSkillsResponse = IBackendRes<IModelPaginate<Skill>>;