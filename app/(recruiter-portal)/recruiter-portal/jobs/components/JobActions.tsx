"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Ban, CheckCircle } from "lucide-react";
import useJobActions from "@/hooks/useJobActions";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useJobConfirmDialog } from "@/app/(recruiter-portal)/recruiter-portal/jobs/hooks/useJobConfirmDialog";

interface JobActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function JobActions({
  selectedCount,
  selectedIds,
}: JobActionsProps) {
  const {
    handleDeactivateJobs,
    handleActivateJobs,
    handleDeleteJob,
    isActivating,
    isDeactivating,
    isDeleting,
  } = useJobActions();

  const { actionType, dialogConfig, openDialog, closeDialog, handleConfirm, isLoading } =
    useJobConfirmDialog({
      onConfirm: async (type, ids) => {
        if (type === "delete") {
          await Promise.all(ids.map(id => handleDeleteJob(id)));
        } else if (type === "activate") {
          await handleActivateJobs(ids);
        } else if (type === "deactivate") {
          await handleDeactivateJobs(ids);
        }
      },
      isActivating,
      isDeactivating,
      isDeleting,
    });

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
            onClick={() => openDialog("activate", selectedIds)}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 rounded-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Đăng tuyển lại
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDialog("deactivate", selectedIds)}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200 rounded-xl"
          >
            <Ban className="h-4 w-4" />
            Ngừng tuyển
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
        isLoading={isLoading}
        disableCancel={isLoading}
      />
    </>
  );
}