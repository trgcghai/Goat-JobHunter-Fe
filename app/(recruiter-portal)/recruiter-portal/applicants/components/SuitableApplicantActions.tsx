import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import EmailDialog, {
  EmailDialogMode
} from "@/components/common/EmailDialog";
import { useState } from "react";
import useSendMailToApplicants
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/hooks/useSendMailToApplicants";
import { toast } from "sonner";
import { useSendMailSlice } from "@/lib/features/sendMailSlice";

interface SuitableApplicantActionsProps {
  selectedCount: number;
  selectedIds: number[];
}

const SuitableApplicantActions = ({ selectedCount, selectedIds }: SuitableApplicantActionsProps) => {
  const [mode, setMode] = useState<EmailDialogMode | null>(null);
  const { handleSendMailToApplicants, isLoading } = useSendMailToApplicants();
  const { jobId } = useSendMailSlice();

  const onInvite = async () => {

    console.log({ applicantIds: selectedIds, jobId });

    if (!jobId || !selectedIds) {
      toast.error("Có lỗi xảy ra khi gửi mail. Vui lòng thử lại sau.");
      return;
    }

    await handleSendMailToApplicants(selectedIds, jobId);
    setMode(null);
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl mb-4">
        <span className="text-sm font-medium">
          Đã chọn {selectedCount} ứng viên
        </span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="default"
            size="sm"
            onClick={() => setMode("invite")}
            className="gap-2 rounded-xl"
          >
            <Mail className="h-4 w-4" />
            Liên hệ với {selectedCount} ứng viên
          </Button>
        </div>
      </div>

      <EmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={mode as "accept" | "reject"}
        selectedCount={selectedCount}
        isLoading={isLoading}
        onAcceptSubmit={async () => {
        }}
        onRejectSubmit={async () => {
        }}
        onInvite={onInvite}
      />
    </>
  );
};
export default SuitableApplicantActions;
