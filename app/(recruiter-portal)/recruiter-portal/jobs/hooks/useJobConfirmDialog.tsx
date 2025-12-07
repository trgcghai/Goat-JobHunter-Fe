import { useMemo, useState } from "react";

export type JobActionType = "activate" | "deactivate" | "delete" | "enable" | "disable" | null;

interface UseJobConfirmDialogProps {
  onConfirm: (actionType: JobActionType, ids: number[], reason?: string) => Promise<void>;
  isActivating?: boolean;
  isDeactivating?: boolean;
  isDeleting?: boolean;
  isEnabling?: boolean;
  isDisabling?: boolean;
}

export const useJobConfirmDialog = ({
  onConfirm,
  isActivating = false,
  isDeactivating = false,
  isDeleting = false,
  isEnabling = false,
  isDisabling = false,
}: UseJobConfirmDialogProps) => {
  const [actionType, setActionType] = useState<JobActionType>(null);
  const [targetIds, setTargetIds] = useState<number[]>([]);
  const [targetTitle, setTargetTitle] = useState<string>("");

  const openDialog = (
    type: JobActionType,
    ids: number[],
    title?: string
  ) => {
    setActionType(type);
    setTargetIds(ids);
    setTargetTitle(title || "");
  };

  const closeDialog = () => {
    setActionType(null);
    setTargetIds([]);
    setTargetTitle("");
  };

  const handleConfirm = async (reason?: string) => {
    try {
      await onConfirm(actionType, targetIds, reason);
      closeDialog();
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  const dialogConfig = useMemo(() => {
    const count = targetIds.length;

    if (actionType === "delete") {
      return {
        title: "Xóa công việc?",
        description: targetTitle ? (
          <>
            Hành động này không thể hoàn tác. Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{targetTitle}&quot;
            </span>{" "}
            sẽ bị xóa vĩnh viễn.
          </>
        ) : (
          <>
            Hành động này không thể hoàn tác. {count} công việc sẽ bị xóa vĩnh
            viễn.
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
        description: targetTitle ? (
          <>
            Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{targetTitle}&quot;
            </span>{" "}
            sẽ hiển thị công khai trở lại.
          </>
        ) : (
          <>{count} công việc sẽ hiển thị công khai trở lại.</>
        ),
        confirmText: "Đăng tuyển",
        confirmBtnClass: "bg-green-600 text-white hover:bg-green-700",
      };
    }

    if (actionType === "deactivate") {
      return {
        title: "Ngừng tuyển dụng?",
        description: targetTitle ? (
          <>
            Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{targetTitle}&quot;
            </span>{" "}
            sẽ bị ẩn khỏi trang tìm kiếm.
          </>
        ) : (
          <>{count} công việc sẽ bị ẩn khỏi trang tìm kiếm.</>
        ),
        confirmText: "Ngừng tuyển",
        confirmBtnClass: "bg-orange-600 text-white hover:bg-orange-700",
      };
    }

    if (actionType === "enable") {
      return {
        title: "Hiển thị công việc?",
        description: targetTitle ? (
          <>
            Công việc{" "}
            <span className="font-bold text-foreground">
              &quot;{targetTitle}&quot;
            </span>{" "}
            sẽ hiển thị công khai trở lại.
          </>
        ) : (
          <>{count} công việc sẽ hiển thị công khai trở lại.</>
        ),
        confirmText: "Hiển thị",
        confirmBtnClass: "bg-green-600 text-white hover:bg-green-700",
      };
    }

    return { title: "", description: null };
  }, [actionType, targetIds.length, targetTitle]);

  return {
    actionType,
    dialogConfig,
    openDialog,
    closeDialog,
    handleConfirm,
    isLoading: isActivating || isDeactivating || isDeleting || isEnabling || isDisabling,
  };
};