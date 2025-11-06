import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Skill } from "@/types/model";

// Create Skill
export type CreateSkillRequest = {
  name: string;
};

export type CreateSkillResponse = IBackendRes<Skill>;

// Update Skill
export type UpdateSkillRequest = {
  skillId: string;
  name: string;
};

export type UpdateSkillResponse = IBackendRes<Skill>;

// Delete Skill
export type DeleteSkillRequest = string; // skillId

export type DeleteSkillResponse = IBackendRes<Skill>;

// Fetch Skills (with pagination)
export type FetchSkillsRequest = {
  page?: number;
  limit?: number;
  sortBy?: string;
  keyword?: string;
};

export type FetchSkillsResponse = IBackendRes<IModelPaginate<Skill>>;
