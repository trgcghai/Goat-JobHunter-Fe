import {
  useDeleteBlogMutation,
  useEnableBlogsMutation,
  useDisableBlogsMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation
} from "@/services/blog/blogApi";
import { useCallback } from "react";
import { toast } from "sonner";
import { BlogActionType } from "@/types/enum";
import { BlogFormData } from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/schema";
import { useUser } from "@/hooks/useUser";
import { useLikeBlogsMutation, useUnlikeBlogsMutation } from "@/services/user/userApi";

const useBlogActions = () => {
  const { isSignedIn, user } = useUser();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [enableBlogs, { isLoading: isEnabling }] = useEnableBlogsMutation();
  const [disableBlogs, { isLoading: isDisabling }] = useDisableBlogsMutation();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [likeBlogs, { isLoading: isLiking }] = useLikeBlogsMutation();
  const [unlikeBlogs, { isLoading: isUnliking }] = useUnlikeBlogsMutation();


  // Delete multiple blogs
  const handleDeleteBlogs = useCallback(
    async (blogIds: number[]) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        await deleteBlog({
          blogIds,
          mode: BlogActionType.DELETE
        }).unwrap();

        toast.success("Xóa bài viết thành công!", {
          description: `Đã xóa ${blogIds.length} bài viết`
        });
      } catch (error) {
        console.error("Failed to delete blogs:", error);
        toast.error("Không thể xóa bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [deleteBlog, isSignedIn, user]
  );

  // Enable blogs
  const handleEnableBlogs = useCallback(
    async (blogIds: number[]) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }
      try {
        await enableBlogs({
          blogIds,
          mode: BlogActionType.ACCEPT
        }).unwrap();

        toast.success("Hiển thị bài viết thành công!");
      } catch (error) {
        console.error("Failed to enable blogs:", error);
        toast.error("Không thể hiển thị bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [enableBlogs, isSignedIn, user]
  );

  // Disable blogs
  const handleDisableBlogs = useCallback(
    async (blogIds: number[], reason?: string) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }
      try {
        await disableBlogs({
          blogIds,
          mode: BlogActionType.REJECT,
          reason: reason ?? ""
        }).unwrap();

        toast.success("Ẩn bài viết thành công!");
      } catch (error) {
        console.error("Failed to disable blogs:", error);
        toast.error("Không thể ẩn bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [disableBlogs, isSignedIn, user]
  );

  // Toggle enable/disable for single blog
  const handleToggleBlogStatus = useCallback(
    async (blogId: number, isEnabled: boolean) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }
      try {
        if (isEnabled) {
          await disableBlogs({
            blogIds: [blogId],
            mode: BlogActionType.REJECT
          }).unwrap();
          toast.success("Đã ẩn bài viết");
        } else {
          await enableBlogs({
            blogIds: [blogId],
            mode: BlogActionType.ACCEPT
          }).unwrap();
          toast.success("Đã hiển thị bài viết");
        }
      } catch (error) {
        console.error("Failed to toggle blog status:", error);
        toast.error(
          "Không thể thay đổi trạng thái bài viết. Vui lòng thử lại sau."
        );
        throw error;
      }
    },
    [isSignedIn, user, disableBlogs, enableBlogs]
  );

  // Create blog
  const handleCreateBlog = useCallback(
    async (data: BlogFormData & { banner: string }) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        const response = await createBlog({
          ...data,
          images: [data.banner]
        }).unwrap();

        if (response.data) {
          toast.success("Tạo bài viết thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to create blog:", error);
        toast.error("Không thể tạo bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [createBlog, isSignedIn, user]
  );

  // Update blog
  const handleUpdateBlog = useCallback(
    async (blogId: number, data: BlogFormData & { banner: string }) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        const response = await updateBlog({
          ...data,
          images: [data.banner],
          blogId: blogId.toString()
        }).unwrap();

        if (response.data) {
          toast.success("Cập nhật bài viết thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to update blog:", error);
        toast.error("Không thể cập nhật bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [isSignedIn, updateBlog, user]
  );

  const handleLikeBlog = useCallback(
    async (blogId: number) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        await likeBlogs({ blogIds: [blogId] }).unwrap();
      } catch (error) {
        console.error("Failed to like blog:", error);
        toast.error("Không thể thích bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [isSignedIn, likeBlogs, user]
  );

  const handleUnlikeBlog = useCallback(
    async (blogId: number) => {
      if (!isSignedIn || !user) {
        toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        await unlikeBlogs({ blogIds: [blogId] }).unwrap();
      } catch (error) {
        console.error("Failed to unlike blog:", error);
        toast.error("Không thể bỏ thích bài viết. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [isSignedIn, unlikeBlogs, user]
  );

  return {
    isDeleting,
    isEnabling,
    isDisabling,
    isCreating,
    isUpdating,
    isLiking,
    isUnliking,
    isLoading:
      isDeleting ||
      isEnabling ||
      isDisabling ||
      isCreating ||
      isUpdating ||
      isLiking ||
      isUnliking,

    handleDeleteBlogs,
    handleEnableBlogs,
    handleDisableBlogs,
    handleToggleBlogStatus,
    handleCreateBlog,
    handleUpdateBlog,
    handleLikeBlog,
    handleUnlikeBlog
  };
};

export default useBlogActions;