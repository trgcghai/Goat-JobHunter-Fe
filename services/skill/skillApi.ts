import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
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
        url: "/skills",
        method: "POST",
        data: { name },
      }),
      invalidatesTags: ["Skill"],
    }),

    updateSkill: builder.mutation<UpdateSkillResponse, UpdateSkillRequest>({
      query: ({ skillId, name }) => ({
        url: "/skills",
        method: "PUT",
        data: { skillId, name },
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkill: builder.mutation<DeleteSkillResponse, DeleteSkillRequest>({
      query: (skillId) => ({
        url: `/skills/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),

    getSkills: builder.query<FetchSkillsResponse, FetchSkillsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["name"], // Không filter
          textSearchFields: ["name"], // Tìm kiếm theo tên kỹ năng
          nestedArrayFields: {}, // Không có nested array
          defaultSort: "updatedAt,desc",
        });
        return {
          url: "/skills",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Skill"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillsQuery,
} = skillApi;
