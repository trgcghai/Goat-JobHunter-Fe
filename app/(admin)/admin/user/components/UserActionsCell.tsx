"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/types/model";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface UserActionsCellProps {
  user: User;
}

export function UserActionsCell({ user }: UserActionsCellProps) {
  const handleToggleStatus = async () => {
    try {
      // TODO: Implement API call to toggle user status
      // await toggleUserStatus(user.userId, !user.enabled);

      toast.success(
        user.enabled
          ? "Đã vô hiệu hóa người dùng"
          : "Đã kích hoạt người dùng"
      );
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái");
      console.error(error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleStatus}
      className="gap-2"
    >
      {user.enabled ? (
        <>
          <XCircle className="w-4 h-4" />
          Vô hiệu hóa
        </>
      ) : (
        <>
          <CheckCircle className="w-4 h-4" />
          Kích hoạt
        </>
      )}
    </Button>
  );
}