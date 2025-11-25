"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import useJobActions from "@/hooks/useJobActions";
import { Job } from "@/types/model";
import { Ban, CheckCircle, Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type ActionType = "delete" | "toggle" | null;

const JobActionsCell = ({ job }: { job: Job }) => {
  const { handleToggleStatus, handleDeleteJob } = useJobActions();
  const [actionType, setActionType] = useState<ActionType>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý logic confirm
  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      if (actionType === "delete") {
        await handleDeleteJob(job.jobId, job.title);
      } else if (actionType === "toggle") {
        await handleToggleStatus(job.jobId, job.active);
      }
      setActionType(null);
    } catch (error) {
      console.error("Action failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Config hiển thị cho Dialog
  const dialogConfig = useMemo(() => {
    if (actionType === "delete") {
      return {
        title: "Xóa công việc?",
        description: (
          <>
            Hành động này không thể hoàn tác. Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{job.title}&quot;
            </span>{" "}
            sẽ bị xóa vĩnh viễn.
          </>
        ),
        confirmText: "Xóa công việc",
        confirmBtnClass:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white",
      };
    }

    if (actionType === "toggle") {
      const isActive = job.active;
      return {
        title: isActive ? "Ngừng tuyển dụng?" : "Đăng tuyển lại?",
        description: (
          <>
            Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{job.title}&quot;
            </span>{" "}
            sẽ{" "}
            {isActive
              ? "bị ẩn khỏi trang tìm kiếm"
              : "hiển thị công khai trở lại"}
            .
          </>
        ),
        confirmText: isActive ? "Ngừng tuyển" : "Đăng tuyển",
        confirmBtnClass: isActive
          ? "bg-orange-600 text-white hover:bg-orange-700"
          : "bg-green-600 text-white hover:bg-green-700",
      };
    }

    return { title: "", description: null };
  }, [actionType, job]);

  return (
    <div className="flex items-center gap-2">
      <Link href={`/jobs/${job.jobId}`}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          title="Xem chi tiết"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        className={`rounded-xl ${
          job.active
            ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200"
            : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
        }`}
        onClick={() => setActionType("toggle")}
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
          <Pencil className="w-4 h-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
        title="Xóa"
        disabled={isLoading}
        onClick={() => setActionType("delete")}
      >
        {isLoading && actionType === "delete" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>

      <ConfirmDialog
        open={!!actionType}
        onOpenChange={(open) => !open && setActionType(null)}
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
