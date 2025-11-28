import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Application } from "@/types/model";
import AcceptForm from "./AcceptForm";
import RejectForm from "./RejectForm";
import { AcceptFormData, RejectFormData } from "./schema";
import { InterviewType } from "@/types/enum";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "accept" | "reject";
  application: Application;
  isLoading?: boolean;
  onSend: (payload: Record<string, string | number | Date | InterviewType>) => Promise<void>;
}

const EmailDialog = ({
                       open,
                       onOpenChange,
                       mode,
                       application,
                       isLoading = false,
                       onSend
                     }: EmailDialogProps) => {
  const onAcceptSubmit = async (data: AcceptFormData) => {
    await onSend({
      mode: "accept",
      applicationId: application.applicationId,
      interviewDate: data.interviewDate,
      interviewType: data.interviewType,
      location: data.location,
      notes: data.notes || ""
    });
    onOpenChange(false);
  };

  const onRejectSubmit = async (data: RejectFormData) => {
    await onSend({
      mode: "reject",
      applicationId: application.applicationId,
      reason: data.reason
    });
    onOpenChange(false);
  };

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
              ? "Gửi email mời phỏng vấn"
              : "Gửi email từ chối"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Email: {application.email}
              </p>
            </div>
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
            {isLoading ? "Đang gửi..." : "Xác nhận gửi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
