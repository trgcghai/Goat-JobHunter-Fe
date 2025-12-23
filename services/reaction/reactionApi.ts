import { api } from "@/services/api";
import { BlogIdsRequest, CheckReactionBlogResponse, ReactionBlogRequest } from "@/services/reaction/reactionType";

export const reactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reactBlog: builder.mutation<void, ReactionBlogRequest>({
      query: (data) => {
        return {
          url: "/reactions/blogs",
          method: "POST",
          data
        };
      },
      invalidatesTags: ["Blog"]
    }),
    unreactBlog: builder.mutation<void, BlogIdsRequest>({
      query: (data) => {
        return {
          url: "/reactions/blogs",
          method: "DELETE",
          data
        };
      },
      invalidatesTags: ["Blog"]
    }),
    checkReactBlog: builder.query<CheckReactionBlogResponse, BlogIdsRequest>({
      query: (params) => {
        return {
          url: `/reactions/blogs`,
          method: "GET",
          params
        };
      },
      providesTags: ["Blog"]
    })
  })
});

export const {
  useReactBlogMutation,
  useUnreactBlogMutation,
  useCheckReactBlogQuery
} = reactionApi;