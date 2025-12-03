import type { IBackendRes, IModelPaginate } from "@/types/api";
import { Blog, CommentType } from "@/types/model";
import { BlogActionType } from "@/types/enum";

// Base Request Types
export type BlogIdRequest = string;

export type BlogIdsRequest = {
  blogIds: number[];
  reason?: string;
  mode: BlogActionType;
};

// Base Blog Content
type BlogContent = {
  title: string;
  banner: string;
  description: string;
  content: string;
  tags: string[];
  draft: boolean;
};

// Create & Update
export type CreateBlogRequest = BlogContent;

export type UpdateBlogRequest = BlogContent & {
  blogId: string;
};

// Fetch with Pagination
export type FetchBlogsRequest = {
  page?: number;
  size?: number;
  sortBy?: string;
  tags?: string[];
  title?: string;
  draft?: boolean;
  enabled?: boolean;
};

export type FetchTagsRequest = {
  keyword?: string;
};

// Like
export type LikeBlogRequest = {
  blogId: number;
  liked: boolean;
};

// Response Types
export type BlogMutationResponse = IBackendRes<Blog>;

export type FetchBlogsResponse = IBackendRes<IModelPaginate<Blog>>;

export type FetchBlogByIdResponse = IBackendRes<Blog>;

export type FetchTagsResponse = IBackendRes<[[string, number]]>;

export type BlogStatusResponse = IBackendRes<{
  blogId: number;
  enabled: boolean;
}[]>;

export type GetCommentsResponse = IBackendRes<CommentType[]>

export type CreateCommentRequest = {
  blogId: number;
  comment: string;
  replyTo?: number;
}