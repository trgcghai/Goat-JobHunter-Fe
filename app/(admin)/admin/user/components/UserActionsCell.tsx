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
    <div className={"flex gap-2 items-center"}>
      {user.enabled ?
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleStatus}
          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
          title={"Vô hiệu hóa người dùng"}
        >
          <XCircle className="h-4 w-4" />
        </Button>
        :
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleStatus}
          className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
          title={"Kích hoạt người dùng"}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      }
    </div>
  );
}