"use client";
import { useMemo } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useFetchRoleByIdQuery } from "@/services/role/roleApi";
import type { Role } from "@/types/model";

interface ManagementPermissionDialogProps {
  roleId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManagePermissionsDialog({ roleId, open, onOpenChange }: ManagementPermissionDialogProps) {
  const { data, isLoading } = useFetchRoleByIdQuery(roleId!, { skip: !roleId });
  const role: Role | undefined = useMemo(() => data?.data || undefined, [data]);

  const handleSave = async () => {
    if (!roleId) return;
    console.log("Saving permissions:", role);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Quản lý quyền cho: {role?.name || "-"}</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} disabled={isLoading} className="rounded-xl">
            {isLoading ? "Đang lưu..." : "Xác nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}