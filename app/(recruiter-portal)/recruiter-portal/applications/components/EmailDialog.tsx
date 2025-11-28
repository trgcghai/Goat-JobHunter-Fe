"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Application } from "@/types/model";
import AcceptForm from "./AcceptForm";
import RejectForm from "./RejectForm";
import { AcceptFormData, RejectFormData } from "./schema";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "accept" | "reject";
  isLoading: boolean;
  onAcceptSubmit: (data: AcceptFormData) => Promise<void>;
  onRejectSubmit: (data: RejectFormData) => Promise<void>;
  application?: Application;
  selectedCount?: number;
}

const EmailDialog = ({
                              open,
                              onOpenChange,
                              mode,
                              isLoading,
                              onAcceptSubmit,
                              onRejectSubmit,
                              application,
                              selectedCount = 0,
                            }: EmailDialogProps) => {
  const isBulk = selectedCount > 0;
  const count = isBulk ? selectedCount : 1;

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
              ? isBulk
                ? `Gửi email mời phỏng vấn cho ${count} ứng viên`
                : "Gửi email mời phỏng vấn"
              : isBulk
                ? `Gửi email từ chối cho ${count} ứng viên`
                : "Gửi email từ chối"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
            {isBulk ? (
              <p className="text-sm font-medium text-gray-900">
                Hành động này sẽ áp dụng cho {count} ứng viên đã chọn
              </p>
            ) : (
              application && (
                <p className="text-sm font-medium text-gray-900">
                  Email: {application.email}
                </p>
              )
            )}
          </div>

          {mode === "accept" ? (
            <AcceptForm onSubmit={onAcceptSubmit} open={open} />
          ) : (
            <RejectForm onSubmit={onRejectSubmit} open={open} />
          )}
        </div>

        <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            type="button"
            className="rounded-xl"
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            form={mode === "accept" ? "accept-form" : "reject-form"}
            variant={mode === "accept" ? "default" : "destructive"}
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? "Đang gửi..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
