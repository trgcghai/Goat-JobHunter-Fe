import {
  useDeleteBlogMutation,
  useEnableBlogsMutation,
  useDisableBlogsMutation
} from "@/services/blog/blogApi";
import { useCallback } from "react";
import { toast } from "sonner";
import { BlogActionType } from "@/types/enum";

const useBlogActions = () => {
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [enableBlogs, { isLoading: isEnabling }] = useEnableBlogsMutation();
  const [disableBlogs, { isLoading: isDisabling }] = useDisableBlogsMutation();

  // Delete multiple blogs
  const handleDeleteBlogs = useCallback(
    async (blogIds: number[]) => {
      try {
        await deleteBlog({
          blogIds,
          mode: BlogActionType.DELETE,
        }).unwrap()

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
          mode: BlogActionType.ACCEPT,
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

  return {
    isDeleting,
    isEnabling,
    isDisabling,
    isLoading: isDeleting || isEnabling || isDisabling,

    handleDeleteBlogs,
    handleEnableBlogs,
    handleDisableBlogs,
    handleToggleBlogStatus,
  };
};

export default useBlogActions;