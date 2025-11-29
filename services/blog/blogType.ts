import type { IBackendRes, IModelPaginate } from "@/types/api";
import type { Blog } from "@/types/model";
import { BlogActionType } from "@/types/enum";

// Create Blog
export type CreateBlogRequest = Blog;

export type CreateBlogResponse = IBackendRes<Blog>;

// Update Blog
export type UpdateBlogRequest = {
  blogId: string;
  blog: Blog;
};

export type UpdateBlogResponse = IBackendRes<Blog>;

export type DeleteBlogResponse = IBackendRes<Blog>;

// Fetch Blogs (with pagination)
export type FetchBlogsRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  tags?: string[];
  title?: string;
  draft?: boolean;
};

export type FetchBlogsResponse = IBackendRes<IModelPaginate<Blog>>;

// Fetch Blog By Id
export type FetchBlogByIdRequest = string; // blogId

export type FetchBlogByIdResponse = IBackendRes<Blog>;

// Like Blog
export type LikeBlogRequest = {
  blog: Blog;
  liked: boolean;
};

export type LikeBlogResponse = IBackendRes<Blog>;

// Fetch Tags
export type FetchTagsRequest = {
  keyword?: string;
};

export type FetchTagsResponse = IBackendRes<[[string, number]]>;

// accept and reject blogs
export type BlogIdsRequest = {
  blogIds: number[];
  reason?: string;
  mode: BlogActionType;
}

export type BlogStatusResponse = IBackendRes<{
  blogId: number;
  enabled: boolean;
}[]>;
