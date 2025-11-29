"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import useJobActions from "@/hooks/useJobActions";
import { Job } from "@/types/model";
import { Ban, CheckCircle, Edit, FileText, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useJobConfirmDialog } from "@/app/(recruiter-portal)/recruiter-portal/jobs/hooks/useJobConfirmDialog";

const JobActionsCell = ({ job }: { job: Job }) => {
  const {
    handleToggleStatus,
    handleDeleteJob,
    isActivating,
    isDeactivating,
    isDeleting,
  } = useJobActions();

  const { actionType, dialogConfig, openDialog, closeDialog, handleConfirm, isLoading } =
    useJobConfirmDialog({
      onConfirm: async (type, ids) => {
        if (type === "delete") {
          await handleDeleteJob(ids[0]);
        } else if (type === "activate" || type === "deactivate") {
          await handleToggleStatus(ids[0], job.active);
        }
      },
      isActivating,
      isDeactivating,
      isDeleting,
    });

  return (
    <div className="flex items-center gap-2">
      <Link href={`/jobs/${job.jobId}`}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          title="Xem chi tiết"
        >
          <FileText className="w-4 h-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        size="icon"
        disabled={isActivating || isDeactivating}
        className={`rounded-xl ${
          job.active
            ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200"
            : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
        }`}
        onClick={() =>
          openDialog(
            job.active ? "deactivate" : "activate",
            [job.jobId],
            job.title
          )
        }
        title={job.active ? "Ngừng tuyển" : "Đăng tuyển lại"}
      >
        {job.active ? (
          <Ban className="w-4 h-4" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
      </Button>

      <Link href={`/recruiter-portal/jobs/form?jobId=${job.jobId}`}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          title="Chỉnh sửa"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
        title="Xóa"
        disabled={isDeleting}
        onClick={() => openDialog("delete", [job.jobId], job.title)}
      >
        {isDeleting && actionType === "delete" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>

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
    </div>
  );
};

export default JobActionsCell;