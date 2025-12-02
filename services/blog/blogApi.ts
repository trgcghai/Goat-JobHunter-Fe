import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  BlogIdRequest,
  BlogIdsRequest,
  BlogMutationResponse,
  BlogStatusResponse,
  CreateBlogRequest,
  FetchBlogByIdResponse,
  FetchBlogsRequest,
  FetchBlogsResponse,
  FetchTagsRequest,
  FetchTagsResponse, GetCommentsResponse,
  LikeBlogRequest,
  UpdateBlogRequest
} from "./blogType";

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
          defaultSort: "createdAt,updatedAt,desc"
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
          nestedArrayFields: {
            tags: "tags.name"
          },
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
          nestedArrayFields: {
            tags: "tags.name"
          },
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
      query: ({ blog, liked }) => ({
        url: "/blogs/liked-blogs",
        method: "PUT",
        data: { blog, liked }
      }),
      invalidatesTags: ["Blog"]
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
      query: (blogId: string) => ({
        url: `/comments/blog/${blogId}`,
        method: "GET"
      }),
      providesTags: ["Blog", "Comment"]
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
  useFetchTagsQuery,
  useFetchBlogsByCurrentRecruiterQuery,
  useEnableBlogsMutation,
  useDisableBlogsMutation,

  // comments hooks
  useGetCommentsByBlogIdQuery
} = blogApi;