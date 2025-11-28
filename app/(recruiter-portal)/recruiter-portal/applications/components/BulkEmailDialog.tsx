import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AcceptForm from "./AcceptForm";
import RejectForm from "./RejectForm";
import { AcceptFormData, RejectFormData } from "./schema";

interface BulkEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "accept" | "reject";
  selectedCount: number;
  isLoading: boolean;
  onAcceptSubmit: (data: AcceptFormData) => Promise<void>;
  onRejectSubmit: (data: RejectFormData) => Promise<void>;
}

const BulkEmailDialog = ({
  open,
  onOpenChange,
  mode,
  selectedCount,
  isLoading,
  onAcceptSubmit,
  onRejectSubmit
}: BulkEmailDialogProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-xl">
        <DialogHeader
          className={`rounded-t-xl px-6 py-4 -mx-6 -mt-6 ${
            mode === "accept"
              ? "bg-green-50 border-b border-green-200"
              : "bg-red-50 border-b border-red-200"
          }`}
        >
          <DialogTitle
            className={`text-xl font-semibold ${
              mode === "accept" ? "text-green-900" : "text-red-900"
            }`}
          >
            {mode === "accept"
              ? `Gửi email mời phỏng vấn cho ${selectedCount} ứng viên`
              : `Gửi email từ chối cho ${selectedCount} ứng viên`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <p className="text-sm font-medium text-gray-900">
              Hành động này sẽ áp dụng cho {selectedCount} ứng viên đã chọn
            </p>
          </div>

          {mode === "accept" ? (
            <AcceptForm onSubmit={onAcceptSubmit} open={open} />
          ) : (
            <RejectForm onSubmit={onRejectSubmit} open={open} />
          )}
        </div>

        <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
          <Button
            type="submit"
            form={mode === "accept" ? "accept-form" : "reject-form"}
            variant={mode === "accept" ? "default" : "destructive"}
            disabled={isLoading}
            className="rounded-xl"
          >
            {(isLoading) ? "Đang gửi..." : `Xác nhận`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailDialog;