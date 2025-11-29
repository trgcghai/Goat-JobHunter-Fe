import {
  useDeleteBlogMutation,
  useEnableBlogsMutation,
  useDisableBlogsMutation, useCreateBlogMutation, useUpdateBlogMutation
} from "@/services/blog/blogApi";
import { useCallback } from "react";
import { toast } from "sonner";
import { BlogActionType } from "@/types/enum";
import { BlogFormData } from "@/app/(recruiter-portal)/recruiter-portal/blogs/form/components/schema";

const useBlogActions = () => {
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [enableBlogs, { isLoading: isEnabling }] = useEnableBlogsMutation();
  const [disableBlogs, { isLoading: isDisabling }] = useDisableBlogsMutation();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();


  // Delete multiple blogs
  const handleDeleteBlogs = useCallback(
    async (blogIds: number[]) => {
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
    [deleteBlog]
  );

  // Enable blogs
  const handleEnableBlogs = useCallback(
    async (blogIds: number[]) => {
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
    [enableBlogs]
  );

  // Disable blogs
  const handleDisableBlogs = useCallback(
    async (blogIds: number[], reason?: string) => {
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
    [disableBlogs]
  );

  // Toggle enable/disable for single blog
  const handleToggleBlogStatus = useCallback(
    async (blogId: number, isEnabled: boolean) => {
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
    [enableBlogs, disableBlogs]
  );

  // Create blog
  const handleCreateBlog = useCallback(
    async (data: BlogFormData & { banner: string }) => {
      try {
        const response = await createBlog(data).unwrap();

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
    [createBlog]
  );

  // Update blog
  const handleUpdateBlog = useCallback(
    async (blogId: number, data: BlogFormData & { banner: string }) => {

      console.log({ blogId, data });

      try {
        const response = await updateBlog({
          ...data,
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
    [updateBlog]
  );

  return {
    isDeleting,
    isEnabling,
    isDisabling,
    isCreating,
    isUpdating,
    isLoading: isDeleting || isEnabling || isDisabling || isCreating || isUpdating,

    handleDeleteBlogs,
    handleEnableBlogs,
    handleDisableBlogs,
    handleToggleBlogStatus,
    handleCreateBlog,
    handleUpdateBlog
  };
};

export default useBlogActions;