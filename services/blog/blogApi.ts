import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import type {
  CreateBlogRequest,
  CreateBlogResponse,
  DeleteBlogRequest,
  DeleteBlogResponse,
  FetchBlogByIdRequest,
  FetchBlogByIdResponse,
  FetchBlogsRequest,
  FetchBlogsResponse,
  FetchTagsRequest,
  FetchTagsResponse,
  LikeBlogRequest,
  LikeBlogResponse,
  UpdateBlogRequest,
  UpdateBlogResponse
} from "./blogType";

export const blogApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createBlog: builder.mutation<CreateBlogResponse, CreateBlogRequest>({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        data: blog
      }),
      invalidatesTags: ["Blog"]
    }),

    updateBlog: builder.mutation<UpdateBlogResponse, UpdateBlogRequest>({
      query: ({ blogId, blog }) => ({
        url: "/blogs",
        method: "PUT",
        data: { ...blog, blogId }
      }),
      invalidatesTags: ["Blog"]
    }),

    deleteBlog: builder.mutation<DeleteBlogResponse, DeleteBlogRequest>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blog"]
    }),

    fetchBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: ["title", "content", "status", "authorId"],
          textSearchFields: ["title", "content"], // LIKE search
          nestedArrayFields: {
            tags: "tags.name" // Map tags -> tags.name
          },
          defaultSort: "createdAt,desc",
          sortableFields: ["title", "createdAt", "updatedAt"]
        });

        return {
          url: "/blogs",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    }),

    fetchPopularBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => {
        // Override sort to prioritize reads and likes
        const modifiedParams = {
          ...params,
          sort: "activity.totalReads,desc" // Sort by reads descending
        };

        const { params: queryParams } = buildSpringQuery({
          params: modifiedParams,
          filterFields: ["title", "content", "status", "authorId"],
          textSearchFields: ["title", "content"],
          nestedArrayFields: {
            tags: "tags.name"
          },
          defaultSort: "activity.totalReads,desc", // Default sort by reads
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

    fetchBlogById: builder.query<FetchBlogByIdResponse, FetchBlogByIdRequest>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "GET"
      }),
      providesTags: ["Blog"]
    }),

    likeBlog: builder.mutation<LikeBlogResponse, LikeBlogRequest>({
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
          filterFields: [
            "title",
            'draft'
          ],
          textSearchFields: ["title"], // Dùng LIKE search
          defaultSort: "updatedAt,desc",
        });

        return {
          url: "/blogs/me",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Blog"]
    })
  })
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogsQuery,
  useFetchPopularBlogsQuery,
  useFetchBlogByIdQuery,
  useLikeBlogMutation,
  useFetchTagsQuery,
  useFetchBlogsByCurrentRecruiterQuery
} = blogApi;
