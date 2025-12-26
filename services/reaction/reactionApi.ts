import { api } from "@/services/api";
import {
  BlogIdsRequest,
  CheckReactionBlogResponse,
  ReactionBlogRequest
} from "@/services/reaction/reactionType";

export const reactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reactBlog: builder.mutation<void, ReactionBlogRequest>({
      query: (data) => ({
        url: "/reactions/blogs",
        method: "POST",
        data
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "Blog", id: "LIST" },
        arg.blogId ? { type: "Blog", id: arg.blogId } : undefined
      ].filter(Boolean) as { type: "Blog"; id: number | "LIST" }[]
    }),

    unreactBlog: builder.mutation<void, BlogIdsRequest>({
      query: (data) => ({
        url: "/reactions/blogs",
        method: "DELETE",
        data
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "Blog", id: "LIST" },
        ...(arg.blogIds ?? []).map((blogId) => ({
          type: "Blog" as const,
          id: blogId
        }))
      ]
    }),

    checkReactBlog: builder.query<CheckReactionBlogResponse, BlogIdsRequest>({
      query: (params) => ({
        url: "/reactions/blogs",
        method: "GET",
        params
      }),
      providesTags: (_, __, arg) =>
        (arg.blogIds ?? []).length
          ? [
            ...arg.blogIds.map((blogId) => ({
              type: "Blog" as const,
              id: blogId
            })),
            { type: "Blog", id: "LIST" }
          ]
          : [{ type: "Blog", id: "LIST" }]
    })
  })
});

export const {
  useReactBlogMutation,
  useUnreactBlogMutation,
  useCheckReactBlogQuery
} = reactionApi;