"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useJobActions from "@/hooks/useJobActions";
import { Job } from "@/types/model";
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const JobActionsCell = ({ job }: { job: Job }) => {
  const { handleDeleteJob, isDeleting } = useJobActions();
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      await handleDeleteJob(job.jobId, job.title);
      setOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Xóa"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Công việc{" "}
              <span className="font-bold text-foreground">
                &quot;{job.title}&quot;
              </span>{" "}
              sẽ bị xóa khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                disabled={isDeleting}
                variant="outline"
                className="rounded-xl"
              >
                Hủy
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild className="bg-destructive text-white">
              <Button
                variant="destructive"
                disabled={isDeleting}
                className="rounded-xl"
                onClick={onDelete}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  "Xóa công việc"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobActionsCell;
