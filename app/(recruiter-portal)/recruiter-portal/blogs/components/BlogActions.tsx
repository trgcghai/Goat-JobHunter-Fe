"use client";

import { Button } from "@/components/ui/button";
import { Trash2, EyeOff, Eye } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useBlogConfirmDialog } from "@/app/(recruiter-portal)/recruiter-portal/blogs/hooks/useBlogConfirmDialog";

interface BlogActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function BlogActions({
  selectedCount,
  selectedIds,
}: BlogActionsProps) {
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

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">
          Đã chọn {selectedCount} bài viết
        </span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDialog("enable", selectedIds)}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 rounded-xl"
          >
            <Eye className="h-4 w-4" />
            Hiển thị
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDialog("disable", selectedIds)}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200 rounded-xl"
          >
            <EyeOff className="h-4 w-4" />
            Ẩn
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => openDialog("delete", selectedIds)}
            className="gap-2 rounded-xl"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
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
}