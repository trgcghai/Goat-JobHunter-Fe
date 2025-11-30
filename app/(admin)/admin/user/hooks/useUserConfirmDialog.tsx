import { useMemo, useState } from "react";

export type UserActionType = "activate" | "deactivate" | null;

interface UseUserConfirmDialogProps {
  onConfirm: (actionType: UserActionType, ids: number[]) => Promise<void>;
  isActivating?: boolean;
  isDeactivating?: boolean;
}

export const useUserConfirmDialog = ({
                                       onConfirm,
                                       isActivating = false,
                                       isDeactivating = false,
                                     }: UseUserConfirmDialogProps) => {
  const [actionType, setActionType] = useState<UserActionType>(null);
  const [targetIds, setTargetIds] = useState<number[]>([]);
  const [targetTitle, setTargetTitle] = useState<string>("");

  const openDialog = (type: UserActionType, ids: number[], title?: string) => {
    setActionType(type);
    setTargetIds(ids);
    setTargetTitle(title || "");
  };

  const closeDialog = () => {
    setActionType(null);
    setTargetIds([]);
    setTargetTitle("");
  };

  const handleConfirm = async () => {
    try {
      await onConfirm(actionType, targetIds);
      closeDialog();
    } catch (error) {
      console.error("User action failed", error);
    }
  };

  const dialogConfig = useMemo(() => {
    const count = targetIds.length;

    if (actionType === "activate") {
      return {
        title: "Kích hoạt người dùng?",
        description: targetTitle ? (
          <>
            Người dùng{" "}
      <span className="font-bold text-foreground">
        &quot;{targetTitle}&quot;
      </span>{" "}
      sẽ được kích hoạt.
      </>
    ) : (
        <>{count} người dùng sẽ được kích hoạt.</>
    ),
      confirmText: "Kích hoạt",
        confirmBtnClass: "bg-green-600 text-white hover:bg-green-700",
    };
    }

    if (actionType === "deactivate") {
      return {
        title: "Vô hiệu hóa người dùng?",
        description: targetTitle ? (
          <>
            Người dùng{" "}
      <span className="font-bold text-foreground">
        &quot;{targetTitle}&quot;
      </span>{" "}
      sẽ bị vô hiệu hóa.
      </>
    ) : (
        <>{count} người dùng sẽ bị vô hiệu hóa.</>
    ),
      confirmText: "Vô hiệu hóa",
        confirmBtnClass:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white",
    };
    }

    return { title: "", description: null, confirmText: "Xác nhận", confirmBtnClass: "" };
  }, [actionType, targetIds.length, targetTitle]);

  return {
    actionType,
    dialogConfig,
    openDialog,
    closeDialog,
    handleConfirm,
    isLoading: isActivating || isDeactivating,
  };
};