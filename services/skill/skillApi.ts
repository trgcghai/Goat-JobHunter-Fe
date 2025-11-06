import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Skill } from "@/types/model";

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation<IBackendRes<Skill>, { name: string }>({
      query: ({ name }) => ({
        url: "/api/v1/skills",
        method: "POST",
        data: { name },
      }),
      invalidatesTags: ["Skill"],
    }),

    updateSkill: builder.mutation<
      IBackendRes<Skill>,
      { skillId: string; name: string }
    >({
      query: ({ skillId, name }) => ({
        url: "/api/v1/skills",
        method: "PUT",
        data: { skillId, name },
      }),
      invalidatesTags: ["Skill"],
    }),

    deleteSkill: builder.mutation<IBackendRes<Skill>, string>({
      query: (skillId) => ({
        url: `/api/v1/skills/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),

    fetchAllSkill: builder.query<IBackendRes<IModelPaginate<Skill>>, string>({
      query: (query) => ({ url: `/api/v1/skills?${query}`, method: "GET" }),
      providesTags: ["Skill"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useFetchAllSkillQuery,
} = skillApi;
