"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/types/model";
import { CheckCircle, XCircle } from "lucide-react";
import useUserActions from "@/hooks/useUserActions";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useUserConfirmDialog } from "@/app/(admin)/admin/user/hooks/useUserConfirmDialog";

interface UserActionsCellProps {
  user: User;
}

export function UserActionsCell({ user }: UserActionsCellProps) {
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
      if (!type || ids.length === 0) return;
      if (type === "activate") {
        await activateUsers(ids);
      } else if (type === "deactivate") {
        await deactivateUsers(ids);
      }
    },
    isActivating,
    isDeactivating,
  });

  return (
    <div className={"flex gap-2 items-center"}>
      {user.enabled ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => openDialog("deactivate", [user.userId], `${user.fullName || user.username || user.contact.email}`)}
          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
          title={"Vô hiệu hóa người dùng"}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => openDialog("activate", [user.userId], `${user.fullName || user.username || user.contact.email}`)}
          className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
          title={"Kích hoạt người dùng"}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}

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
}