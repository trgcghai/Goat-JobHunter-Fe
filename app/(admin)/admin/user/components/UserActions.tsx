"use client";

import { Button } from "@/components/ui/button";
import { Ban, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const handleDelete = async () => {
    try {
      // TODO: Implement API call
      // await deleteUsers({ userIds: selectedIds });
      toast.success(`Đã xóa ${selectedCount} người dùng`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa người dùng");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2 py-4">
      <span className="text-sm text-muted-foreground">
        Đã chọn {selectedCount} người dùng
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleActivate}
        className="gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Kích hoạt
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDeactivate}
        className="gap-2"
      >
        <Ban className="w-4 h-4" />
        Vô hiệu hóa
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Xóa
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedCount} người dùng đã chọn?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}