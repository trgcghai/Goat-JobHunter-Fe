"use client";

import { Blog } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useBlogConfirmDialog } from "@/app/(recruiter-portal)/recruiter-portal/blogs/hooks/useBlogConfirmDialog";

interface BlogActionsCellProps {
  blog: Blog;
}

const BlogActionsCell = ({ blog }: BlogActionsCellProps) => {
  const { actionType, dialogConfig, openDialog, closeDialog, handleConfirm } =
    useBlogConfirmDialog({
      onConfirm: async (type, ids) => {
        if (type === "delete") {
          // Add delete logic
        } else if (type === "enable") {
          // Add enable logic
        } else if (type === "disable") {
          // Add disable logic
        }
      },
    });

  return (
    <>
      <div className="flex items-center gap-2">
        <Link href={`/recruiter-portal/blogs/${blog.blogId}`}>
          <Button
            size={"icon"}
            className={"rounded-xl"}
            variant={"outline"}
            title="Xem chi tiết"
          >
            <FileText className={"h-4 w-4"} />
          </Button>
        </Link>

        <Button
          size={"icon"}
          variant={"outline"}
          className={`rounded-xl ${
            blog.enabled
              ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200"
              : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
          }`}
          title={blog.enabled ? "Ẩn bài viết" : "Hiển thị bài viết"}
          onClick={() =>
            openDialog(
              blog.enabled ? "disable" : "enable",
              [blog.blogId],
              blog.title
            )
          }
        >
          {blog.enabled ? (
            <EyeOff className={"h-4 w-4"} />
          ) : (
            <Eye className={"h-4 w-4"} />
          )}
        </Button>

        <Link href={`/recruiter-portal/blogs/form?blogId=${blog.blogId}`}>
          <Button
            size={"icon"}
            className={"rounded-xl"}
            variant={"outline"}
            title="Chỉnh sửa"
          >
            <Edit className={"h-4 w-4"} />
          </Button>
        </Link>

        <Button
          size={"icon"}
          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
          variant={"outline"}
          title="Xóa"
          onClick={() => openDialog("delete", [blog.blogId], blog.title)}
        >
          <Trash2 className={"h-4 w-4"} />
        </Button>
      </div>

      <ConfirmDialog
        open={!!actionType}
        onOpenChange={(open) => !open && closeDialog()}
        title={dialogConfig.title}
        description={dialogConfig.description}
        confirmText={dialogConfig.confirmText}
        confirmBtnClass={dialogConfig.confirmBtnClass}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default BlogActionsCell;