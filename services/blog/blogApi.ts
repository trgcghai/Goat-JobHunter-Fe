import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import {
  BlogIdRequest,
  BlogIdsRequest,
  BlogMutationResponse,
  BlogStatusResponse,
  CreateBlogRequest, CreateCommentRequest,
  FetchBlogByIdResponse,
  FetchBlogsRequest,
  FetchBlogsResponse,
  FetchTagsRequest,
  FetchTagsResponse, GetCommentsResponse,
  LikeBlogRequest,
  UpdateBlogRequest
} from "./blogType";
import { IBackendRes } from "@/types/api";

export const blogApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createBlog: builder.mutation<BlogMutationResponse, CreateBlogRequest>({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        data: blog
      }),
      invalidatesTags: ["Blog"]
    }),

    updateBlog: builder.mutation<BlogMutationResponse, UpdateBlogRequest>({
      query: (data) => ({
        url: "/blogs",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Blog"]
    }),

    deleteBlog: builder.mutation<BlogMutationResponse, BlogIdsRequest>({
      query: (data) => ({
        url: `/blogs`,
        method: "DELETE",
        data
      }),
      invalidatesTags: ["Blog"]
    }),

    fetchBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["title", "draft", "enabled"],
          textSearchFields: ["title"],
          defaultSort: "createdAt,desc"
        });

        return {
          url: "/blogs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    }),

    fetchAvailableBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["title", "content", "authorId"],
          textSearchFields: ["title", "content"],
          arrayFields: ["tags"],
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "createdAt", "updatedAt"]
        });

        return {
          url: "/blogs/available",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    }),

    fetchPopularBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        const modifiedParams = {
          ...params,
          sort: "activity.totalReads,desc"
        };

        const { params: queryParams } = buildSpringQuery({
          params: modifiedParams,
          filterFields: ["title", "content", "authorId"],
          textSearchFields: ["title", "content"],
          arrayFields: ["tags"],
          defaultSort: "activity.totalReads,desc",
          sortableFields: [
            "title",
            "createdAt",
            "updatedAt",
            "activity.totalReads",
            "activity.totalLikes",
            "activity.totalComments"
          ]
        });

        return {
          url: "/blogs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    }),

    fetchBlogById: builder.query<FetchBlogByIdResponse, BlogIdRequest>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "GET"
      }),
      providesTags: ["Blog"]
    }),

    likeBlog: builder.mutation<BlogMutationResponse, LikeBlogRequest>({
      query: ({ blogId, liked }) => ({
        url: "/blogs/liked-blogs",
        method: "PUT",
        data: { blogId, liked }
      }),
      invalidatesTags: ["Blog"]
    }),

    checkLikedBlog: builder.query<IBackendRes<boolean>, number>({
      query: (blogId) => ({
        url: `/blogs/liked-blogs/${blogId}`,
        method: "GET"
      }),
      providesTags: ["Blog"]
    }),

    fetchTags: builder.query<FetchTagsResponse, FetchTagsRequest>({
      query: (params) => ({
        url: "/blogs/tags",
        method: "GET",
        params
      })
    }),

    fetchBlogsByCurrentRecruiter: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["title", "draft"],
          textSearchFields: ["title"],
          arrayFields: ["tags"],
          defaultSort: "createdAt,updatedAt,desc"
        });

        return {
          url: "/blogs/me",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    }),

    enableBlogs: builder.mutation<BlogStatusResponse, BlogIdsRequest>({
      query: (blogIds) => ({
        url: "/blogs/enabled",
        method: "PUT",
        data: blogIds
      }),
      invalidatesTags: ["Blog"]
    }),

    disableBlogs: builder.mutation<BlogStatusResponse, BlogIdsRequest>({
      query: (blogIds) => ({
        url: "/blogs/disabled",
        method: "PUT",
        data: blogIds
      }),
      invalidatesTags: ["Blog"]
    }),

    // comments endpoints
    getCommentsByBlogId: builder.query<GetCommentsResponse, string>({
      query: (blogId: string) => {
        const { params } = buildSpringQuery({
          params: {},
          filterFields: [],
          sortableFields: ["createdAt"],
          defaultSort: "createdAt,desc"
        });

        return {
          url: `/comments/blog/${blogId}`,
          method: "GET",
          params
        };
      },
      providesTags: ["Blog", "Comment"]
    }),

    createComment: builder.mutation<unknown, CreateCommentRequest>({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        data
      }),
      invalidatesTags: ["Blog", "Comment"]
    }),

    deleteComment: builder.mutation<unknown, number>({
      query: (commentId: number) => ({
        url: `/comments/${commentId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blog", "Comment"]
    })
  })
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogsQuery,
  useFetchAvailableBlogsQuery,
  useFetchPopularBlogsQuery,
  useFetchBlogByIdQuery,
  useLikeBlogMutation,
  useCheckLikedBlogQuery,
  useFetchTagsQuery,
  useFetchBlogsByCurrentRecruiterQuery,
  useEnableBlogsMutation,
  useDisableBlogsMutation,

  // comments hooks
  useGetCommentsByBlogIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = blogApi;