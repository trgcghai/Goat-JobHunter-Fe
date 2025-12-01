import { Applicant } from "@/types/model";
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

interface SuitableApplicantActionsCellProps {
  applicant: Applicant;
}

const SuitableApplicantActionsCell = ({ applicant }: SuitableApplicantActionsCellProps) => {
  const [mode, setMode] = useState<EmailDialogMode | null>(null);
  const { handleSendMailToApplicants, isLoading } = useSendMailToApplicants();
  const { jobId } = useSendMailSlice();

  const onInvite = async () => {

    console.log({ applicantIds: applicant?.userId, jobId });

    if (!applicant?.userId || !jobId) {
      toast.error("Có lỗi xảy ra khi gửi mail. Vui lòng thử lại sau.");
      return
    }

    await handleSendMailToApplicants([applicant?.userId], jobId);
    setMode(null);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => setMode("invite")}
          title="Gửi email"
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>

      <EmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={mode as "accept" | "reject"}
        applicant={applicant}
        isLoading={isLoading}
        onAcceptSubmit={async () => {}}
        onRejectSubmit={async () => {}}
        onInvite={onInvite}
      />
    </>
  );
};
export default SuitableApplicantActionsCell;
