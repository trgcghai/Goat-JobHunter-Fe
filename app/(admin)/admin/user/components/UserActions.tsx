"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import useUserActions from "@/hooks/useUserActions";
import { useUserConfirmDialog } from "@/app/(admin)/admin/user/hooks/useUserConfirmDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

interface UserActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function UserActions({
  selectedCount,
  selectedIds,
}: UserActionsProps) {
  const {
    activateUsers,
    deactivateUsers,
    isActivating,
    isDeactivating,
  } = useUserActions();

  const {
    actionType,
    dialogConfig,
    openDialog,
    closeDialog,
    handleConfirm,
    isLoading,
  } = useUserConfirmDialog({
    onConfirm: async (type, ids) => {
      if (!type) return;
      if (type === "activate") {
        await activateUsers(ids);
      } else if (type === "deactivate") {
        await deactivateUsers(ids);
      }
    },
    isActivating,
    isDeactivating,
  });

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">Đã chọn {selectedCount} người dùng</span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="default"
            size="sm"
            onClick={() => openDialog("activate", selectedIds)}
            className="gap-2 rounded-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Kích hoạt
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => openDialog("deactivate", selectedIds)}
            className="gap-2 rounded-xl"
          >
            <XCircle className="h-4 w-4" />
            Vô hiệu hóa
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