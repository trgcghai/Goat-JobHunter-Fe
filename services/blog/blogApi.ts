import { api } from "@/services/api";
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
  UpdateBlogResponse,
} from "./blogType";

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation<CreateBlogResponse, CreateBlogRequest>({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        data: blog,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation<UpdateBlogResponse, UpdateBlogRequest>({
      query: ({ blogId, blog }) => ({
        url: "/blogs",
        method: "PUT",
        data: { blogId, ...blog },
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation<DeleteBlogResponse, DeleteBlogRequest>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    fetchBlogs: builder.query<FetchBlogsResponse, FetchBlogsRequest>({
      query: (params) => ({
        url: "/blogs",
        method: "GET",
        params,
      }),
      providesTags: ["Blog"],
    }),

    fetchBlogById: builder.query<FetchBlogByIdResponse, FetchBlogByIdRequest>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    likeBlog: builder.mutation<LikeBlogResponse, LikeBlogRequest>({
      query: ({ blog, liked }) => ({
        url: "/blogs/liked-blogs",
        method: "PUT",
        data: { blog, liked },
      }),
      invalidatesTags: ["Blog"],
    }),

    fetchTags: builder.query<FetchTagsResponse, FetchTagsRequest>({
      query: (params) => ({
        url: "/blogs/tags",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useLikeBlogMutation,
  useFetchTagsQuery,
} = blogApi;
