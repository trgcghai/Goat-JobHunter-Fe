"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Ban, CheckCircle } from "lucide-react";
import { useMemo, useState } from "react";
import useJobActions from "@/hooks/useJobActions";
import ConfirmDialog from "@/components/ConfirmDialog";

interface JobActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

type ActionType = "activate" | "deactivate" | "delete" | null;

export default function JobActions({
  selectedCount,
  selectedIds,
}: JobActionsProps) {
  const [actionType, setActionType] = useState<ActionType>(null);
  const {
    handleDeactivateJobs,
    handleActivateJobs,
    handleDeleteJob,
    isActivating,
    isDeactivating,
    isDeleting,
  } = useJobActions();

  const handleConfirm = async () => {
    try {
      if (actionType == "delete") {

        await Promise.all(selectedIds.map(id => handleDeleteJob(id)));

      } else if (actionType == "activate") {

        await handleActivateJobs(selectedIds)

      } else if (actionType == "deactivate") {

        await handleDeactivateJobs(selectedIds)

      }

      setActionType(null);
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  const dialogConfig = useMemo(() => {
    if (actionType === "delete") {
      return {
        title: "Xóa công việc?",
        description: (
          <>
            Hành động này không thể hoàn tác. {selectedCount} công việc sẽ bị xóa vĩnh viễn.
          </>
        ),
        confirmText: "Xóa công việc",
        confirmBtnClass:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white",
      };
    }

    if (actionType === "activate") {
      return {
        title: "Đăng tuyển lại?",
        description: (
          <>
            {selectedCount} công việc sẽ hiển thị công khai trở lại.
          </>
        ),
        confirmText: "Đăng tuyển",
        confirmBtnClass: "bg-green-600 text-white hover:bg-green-700",
      };
    }

    if (actionType === "deactivate") {
      return {
        title: "Ngừng tuyển dụng?",
        description: (
          <>
            {selectedCount} công việc sẽ bị ẩn khỏi trang tìm kiếm.
          </>
        ),
        confirmText: "Ngừng tuyển",
        confirmBtnClass: "bg-orange-600 text-white hover:bg-orange-700",
      };
    }

    return { title: "", description: null };
  }, [actionType, selectedCount]);

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">
          Đã chọn {selectedCount} công việc
        </span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActionType("activate")}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 rounded-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Đăng tuyển lại
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActionType("deactivate")}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200 rounded-xl"
          >
            <Ban className="h-4 w-4" />
            Ngừng tuyển
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
        isLoading={isActivating || isDeactivating || isDeleting}
        disableCancel={isActivating || isDeactivating || isDeleting}
      />
    </>
  );
}