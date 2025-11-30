"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/types/model";
import { CheckCircle, ClipboardList, XCircle } from "lucide-react";
import useUserActions from "@/hooks/useUserActions";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useUserConfirmDialog } from "@/app/(admin)/admin/user/hooks/useUserConfirmDialog";
import JobListDialog from "@/app/(admin)/admin/user/components/JobListDialog";
import { useState } from "react";
import ApplicationListDialog from "@/app/(admin)/admin/user/components/ApplicationListDialog";

interface UserActionsCellProps {
  user: User;
}

export function UserActionsCell({ user }: UserActionsCellProps) {
  const {
    activateUsers,
    deactivateUsers,
    isActivating,
    isDeactivating
  } = useUserActions();
  const [isJobListOpen, setIsJobListOpen] = useState(false);
  const [isApplicationListOpen, setIsApplicationListOpen] = useState(false);


  const {
    actionType,
    dialogConfig,
    openDialog,
    closeDialog,
    handleConfirm,
    isLoading
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
    isDeactivating
  });

  return (
    <div className={"flex gap-2 items-center"}>
      {user.enabled ? (
        <Button
          variant="outline"
          size="icon"
          onClick={() => openDialog("deactivate", [user.userId], `${user.fullName || user.username || user.contact.email}`)}
          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
          title={"Vô hiệu hóa người dùng"}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => openDialog("activate", [user.userId], `${user.fullName || user.username || user.contact.email}`)}
          className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
          title={"Kích hoạt người dùng"}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
      {user.role.name == "APPLICANT" && <Button
        variant="outline"
        size="icon"
        className="rounded-xl"
        title={"Xem các đơn ứng tuyển của người dùng này"}
        onClick={() => setIsApplicationListOpen(true)}
      >
        <ClipboardList className="h-4 w-4" />
      </Button>}
      {user.role.name == "HR" && <Button
        variant="outline"
        size="icon"
        className="rounded-xl"
        title={"Xem các công việc của người dùng này"}
        onClick={() => setIsJobListOpen(true)}
      >
        <ClipboardList className="h-4 w-4" />
      </Button>}

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

      <JobListDialog
        user={user}
        open={isJobListOpen}
        onOpenChange={setIsJobListOpen}
      />

      <ApplicationListDialog
        user={user}
        open={isApplicationListOpen}
        onOpenChange={setIsApplicationListOpen}
      />
    </div>
  );
}