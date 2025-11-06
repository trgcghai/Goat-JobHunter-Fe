import { api } from "@/services/api";
import type {
  CreateSkillRequest,
  CreateSkillResponse,
  DeleteSkillRequest,
  DeleteSkillResponse,
  FetchSkillsRequest,
  FetchSkillsResponse,
  UpdateSkillRequest,
  UpdateSkillResponse,
} from "./skillType";

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation<CreateSkillResponse, CreateSkillRequest>({
      query: ({ name }) => ({
        url: "/api/v1/skills",
        method: "POST",
        data: { name },
      }),
      invalidatesTags: ["Skill"],
    }),

    updateSkill: builder.mutation<UpdateSkillResponse, UpdateSkillRequest>({
      query: ({ skillId, name }) => ({
        url: "/api/v1/skills",
        method: "PUT",
        data: { skillId, name },
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkill: builder.mutation<DeleteSkillResponse, DeleteSkillRequest>({
      query: (skillId) => ({
        url: `/api/v1/skills/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),

    fetchSkills: builder.query<FetchSkillsResponse, FetchSkillsRequest>({
      query: (params) => ({
        url: "/api/v1/skills",
        method: "GET",
        params,
      }),
      providesTags: ["Skill"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useFetchSkillsQuery,
} = skillApi;
