"use client";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import ManagePermissionsDialog from "./ManagePermissionsDialog";
import type { Role } from "@/types/model";
import useRoleAndPermissionActions from "@/hooks/useRoleAndPermissionActions";

interface RoleActionsCellProps {
  role: Role;
}

export default function RoleActionsCell({ role }: RoleActionsCellProps) {
  const [isPermOpen, setIsPermOpen] = useState(false);
  const [actionType, setActionType] = useState<"activate" | "deactivate" | "delete" | null>(null);
  const {
    handleDeleteRole,
    handleActivateRole,
    handleDeactivateRole,
    isDeleting,
    isActivating,
    isDeactivating
  } = useRoleAndPermissionActions();

  const openConfirm = (type: "activate" | "deactivate" | "delete") => setActionType(type);

  const handleConfirm = async () => {
    if (!actionType) return;
    try {
      if (actionType === "delete") {
        await handleDeleteRole(role.roleId);
      } else if (actionType === "activate") {
        await handleActivateRole(role.roleId);
      } else if (actionType === "deactivate") {
        await handleDeactivateRole(role.roleId);
      }
    } catch (e) {
      console.error(e);
    }
    setActionType(null);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {role.active ? (
          <Button
            size="icon"
            variant="outline"
            className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            title="Vô hiệu hóa"
            onClick={() => openConfirm("deactivate")}>
            <XCircle className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
            title="Kích hoạt"
            onClick={() => openConfirm("activate")}>
            <CheckCircle className="h-4 w-4" />
          </Button>
        )}

        <Button
          size="icon"
          variant="outline"
          className={"rounded-xl"}
          title="Quản lý quyền"
          onClick={() => setIsPermOpen(true)}>
          <Edit3 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          className={"rounded-xl"}
          title="Xóa vai trò"
          onClick={() => openConfirm("delete")}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmDialog
        open={!!actionType}
        onOpenChange={(open) => !open && setActionType(null)}
        title={
          actionType === "delete"
            ? "Xóa vai trò?"
            : actionType === "activate"
              ? "Kích hoạt vai trò?"
              : "Vô hiệu hóa vai trò?"
        }
        description={actionType === "delete" ? "Hành động này không thể hoàn tác." : undefined}
        confirmText={actionType === "delete" ? "Xóa" : actionType === "activate" ? "Kích hoạt" : "Vô hiệu hóa"}
        confirmBtnClass={actionType === "delete" || actionType === "deactivate" ? "bg-destructive text-white" : "bg-primary text-white"}
        onConfirm={handleConfirm}
        isLoading={isDeleting || isActivating || isDeactivating}
        disableCancel={isDeleting || isActivating || isDeactivating}
      />

      <ManagePermissionsDialog role={role} open={isPermOpen} onOpenChange={setIsPermOpen} />
    </>
  );
}