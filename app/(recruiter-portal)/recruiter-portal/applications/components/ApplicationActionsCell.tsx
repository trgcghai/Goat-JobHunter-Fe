import { Button } from "@/components/ui/button";
import { Application } from "@/types/model";
import { Check, FileText, X } from "lucide-react";
import { useMemo, useState } from "react";
import EmailDialog from "@/app/(recruiter-portal)/recruiter-portal/applications/components/EmailDialog";
import useApplicationActions from "@/hooks/useApplicationActions";
import { toast } from "sonner";
import { InterviewType } from "@/types/enum";
import ResumePreviewDialog from "@/components/ResumePreivewDialog";

interface ApplicationActionsCellProps {
  application: Application;
}

const ApplicationActionsCell = ({ application }: ApplicationActionsCellProps) => {
  const [mode, setMode] = useState<"accept" | "reject" | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const { isRejecting, isAccepting, handleRejectApplications, handleAcceptApplications } = useApplicationActions();

  const handleSubmit = async (payload: Record<string, string | number | Date | InterviewType>) => {
    if (mode === "accept") {
        await handleAcceptApplications({
          applicationIds: [application.applicationId],
          interviewDate: payload.interviewDate as Date,
          interviewType: payload.interviewType as InterviewType,
          location: payload.location as string,
          note: payload.note as string
        })
    } else if (mode === "reject") {
        await handleRejectApplications({
          applicationIds: [application.applicationId],
          reason: payload.reason as string
        })
    } else {
      toast.info("Không thể xử lý yêu cầu hiện tại. Vui lòng thử lại sau.");
    }
  };

  const dialogOpen = !!mode;

  const dialogConfig = useMemo(() => {
    return {
      mode: mode as "accept" | "reject"
    };
  }, [mode]);

  // Disable actions if application is already rejected or accepted
  const isProcessed = useMemo(
    () =>
      application.status === "ACCEPTED" || application.status === "REJECTED",
    [application.status]
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-xl"
        title={application.resumeUrl ? "Xem CV" : "Ứng viên chưa tải lên CV"}
        onClick={() => setOpenPreview(true)}
        disabled={!application.resumeUrl}
      >
        <FileText className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
        title="Chấp nhận"
        onClick={() => setMode("accept")}
        disabled={isProcessed || isRejecting || isAccepting}
      >
        <Check className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
        title="Từ chối"
        onClick={() => setMode("reject")}
        disabled={isProcessed ||  isRejecting || isAccepting}
      >
        <X className="w-4 h-4" />
      </Button>

      <EmailDialog
        open={dialogOpen}
        onOpenChange={(open) => !open && setMode(null)}
        mode={dialogConfig.mode}
        application={application}
        isLoading={ isRejecting || isAccepting}
        onSend={handleSubmit}
      />

      <ResumePreviewDialog
        open={openPreview}
        onOpenChange={setOpenPreview}
        application={application}
      />
    </div>
  );
};

export default ApplicationActionsCell;
