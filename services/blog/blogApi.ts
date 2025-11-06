import { api } from "@/services/api";
import { IBackendRes, IModelPaginate } from "@/types/api";
import type { Blog } from "@/types/model";

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation<IBackendRes<Blog>, Blog>({
      query: (blog) => ({
        url: "/api/v1/blogs",
        method: "POST",
        data: blog,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation<
      IBackendRes<Blog>,
      { blog: Blog; blogId: string }
    >({
      query: ({ blogId, blog }) => ({
        url: "/api/v1/blogs",
        method: "PUT",
        data: { blogId, ...blog },
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation<IBackendRes<Blog>, string>({
      query: (blogId) => ({
        url: `/api/v1/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    fetchBlog: builder.query<IBackendRes<IModelPaginate<Blog>>, string>({
      query: (query) => ({ url: `/api/v1/blogs?${query}`, method: "GET" }),
      providesTags: ["Blog"],
    }),

    fetchBlogById: builder.query<IBackendRes<Blog>, string>({
      query: (blogId) => ({ url: `/api/v1/blogs/${blogId}`, method: "GET" }),
      providesTags: ["Blog"],
    }),

    likeBlogs: builder.mutation<
      IBackendRes<Blog>,
      { blog: Blog; liked: boolean }
    >({
      query: ({ blog, liked }) => ({
        url: "/api/v1/blogs/liked-blogs",
        method: "PUT",
        data: { blog, liked },
      }),
      invalidatesTags: ["Blog"],
    }),

    fetchTag: builder.query<IBackendRes<string[]>, string>({
      query: (keyword) => ({
        url: `/api/v1/blogs/tags?keyword=${keyword}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useFetchBlogQuery,
  useFetchBlogByIdQuery,
  useLikeBlogsMutation,
  useFetchTagQuery,
} = blogApi;
