"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface UserActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

export default function UserActions({
  selectedCount,
  selectedIds,
}: UserActionsProps) {
  if (selectedCount === 0) return null;

  const handleActivate = async () => {
    try {
      // TODO: Implement API call
      // await activateUsers({ userIds: selectedIds });
      toast.success(`Đã kích hoạt ${selectedCount} người dùng`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi kích hoạt người dùng");
      console.error(error);
    }
  };

  const handleDeactivate = async () => {
    try {
      // TODO: Implement API call
      // await deactivateUsers({ userIds: selectedIds });
      toast.success(`Đã vô hiệu hóa ${selectedCount} người dùng`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi vô hiệu hóa người dùng");
      console.error(error);
    }
  };

  return (
  <>
    <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">
          Đã chọn {selectedCount} người dùng
        </span>
      <div className="flex gap-4 ml-auto">
        <Button
          variant="default"
          size="sm"
          onClick={handleActivate}
          className="gap-2 rounded-xl"
        >
          <CheckCircle className="h-4 w-4" />
          Kích hoạt
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeactivate}
          className="gap-2 rounded-xl"
        >
          <XCircle className="h-4 w-4" />
          Vô hiệu hóa
        </Button>
      </div>
    </div>
  </>
  );
}