import { Button } from "@/components/ui/button";
import { Application } from "@/types/model";
import { Check, FileText, X } from "lucide-react";
import { useMemo, useState } from "react";
import useApplicationActions from "@/hooks/useApplicationActions";
import { AcceptFormData, RejectFormData } from "./schema";
import ResumePreviewDialog from "@/components/common/ResumePreivewDialog";
import EmailDialog, {
  EmailDialogMode
} from "@/components/common/EmailDialog";
import { ApplicationStatus } from "@/types/enum";

interface ApplicationActionsCellProps {
  application: Application;
}

const ApplicationActionsCell = ({ application }: ApplicationActionsCellProps) => {
  const [mode, setMode] = useState<EmailDialogMode | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const { isRejecting, isAccepting, handleRejectApplications, handleAcceptApplications } = useApplicationActions();

  const onAcceptSubmit = async (data: AcceptFormData) => {
    await handleAcceptApplications({
      applicationIds: [application.applicationId],
      interviewDate: data.interviewDate,
      interviewType: data.interviewType,
      location: data.location,
      note: data.notes || ""
    });
    setMode(null);
  };

  const onRejectSubmit = async (data: RejectFormData) => {
    await handleRejectApplications({
      applicationIds: [application.applicationId],
      reason: data.reason
    });
    setMode(null);
  };

  const isProcessed = useMemo(
    () =>
      application.status === ApplicationStatus.ACCEPTED || application.status === ApplicationStatus.REJECTED,
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

      {/* only show reject and accept button when the application is not processed */}
      {!isProcessed &&
        <>
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
            disabled={isProcessed || isRejecting || isAccepting}
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      }

      <EmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={mode as "accept" | "reject"}
        application={application}
        isLoading={isRejecting || isAccepting}
        onAcceptSubmit={onAcceptSubmit}
        onRejectSubmit={onRejectSubmit}
        onInvite={() => {}}
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
