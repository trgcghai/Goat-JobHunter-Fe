"use client";

import { Button } from "@/components/ui/button";
import { Trash2, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

interface BlogActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

type ActionType = "publish" | "delete" | null;

export default function BlogActions({
  selectedCount,
  selectedIds,
}: BlogActionsProps) {
  const [actionType, setActionType] = useState<ActionType>(null);

  const handleConfirm = async () => {
    try {
      if (actionType === "delete") {
        // Add delete logic
      } else if (actionType === "publish") {
        // Add publish logic
      }
      setActionType(null);
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  const dialogConfig = useMemo(() => {
    if (actionType === "delete") {
      return {
        title: "Xóa bài viết?",
        description: `Hành động này không thể hoàn tác. ${selectedCount} bài viết sẽ bị xóa vĩnh viễn.`,
        confirmText: "Xóa bài viết",
        confirmBtnClass: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white",
      };
    }

    if (actionType === "publish") {
      return {
        title: "Xuất bản bài viết?",
        description: `${selectedCount} bài viết sẽ được công khai.`,
        confirmText: "Xuất bản",
        confirmBtnClass: "bg-green-600 text-white hover:bg-green-700",
      };
    }

    return { title: "", description: "" };
  }, [actionType, selectedCount]);

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
            onClick={() => setActionType("publish")}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 rounded-xl"
          >
            <FileText className="h-4 w-4" />
            Xuất bản
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setActionType("delete")}
            className="gap-2 rounded-xl"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={!!actionType}
        onOpenChange={(open) => !open && setActionType(null)}
        title={dialogConfig.title}
        description={dialogConfig.description}
        confirmText={dialogConfig.confirmText}
        confirmBtnClass={dialogConfig.confirmBtnClass}
        onConfirm={handleConfirm}
      />
    </>
  );
}