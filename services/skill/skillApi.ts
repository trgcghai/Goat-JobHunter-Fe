import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CreateSkillRequest,
  FetchSkillsRequest,
  FetchSkillsResponse,
  SkillIdRequest,
  SkillMutationResponse,
  UpdateSkillRequest
} from "./skillType";

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation<SkillMutationResponse, CreateSkillRequest>({
      query: ({ name }) => ({
        url: "/skills",
        method: "POST",
        data: { name }
      }),
      invalidatesTags: ["Skill"]
    }),

    updateSkill: builder.mutation<SkillMutationResponse, UpdateSkillRequest>({
      query: ({ skillId, name }) => ({
        url: "/skills",
        method: "PUT",
        data: { skillId, name }
      }),
      invalidatesTags: ["Skill"]
    }),

    deleteSkill: builder.mutation<SkillMutationResponse, SkillIdRequest>({
      query: (skillId) => ({
        url: `/skills/${skillId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Skill"]
    }),

    getSkills: builder.query<FetchSkillsResponse, FetchSkillsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["name"],
          textSearchFields: ["name"],
          nestedArrayFields: {},
          defaultSort: "updatedAt,desc"
        });
        return {
          url: "/skills",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Skill"]
    })
  })
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillsQuery
} = skillApi;