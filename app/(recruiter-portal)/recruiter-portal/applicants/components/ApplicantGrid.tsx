import { Applicant } from "@/types/model";
import ApplicantGridCard from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/ApplicantGridCard";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import EmailDialog, {
  EmailDialogMode
} from "@/components/common/EmailDialog";
import { useState } from "react";
import useSendMailToApplicants
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/hooks/useSendMailToApplicants";
import { toast } from "sonner";
import { useSendMailSlice } from "@/lib/features/sendMailSlice";

interface ApplicantGridProps {
  applicants: Applicant[];
}

const ApplicantGrid = ({ applicants }: ApplicantGridProps) => {

  const [mode, setMode] = useState<EmailDialogMode | null>(null);
  const { handleSendMailToApplicants, isLoading } = useSendMailToApplicants();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const { jobId } = useSendMailSlice();

  const onInvite = async () => {

    console.log({ applicantIds: [selectedApplicant?.userId], jobId });

    if (!selectedApplicant?.userId || !jobId) {
      toast.error("Có lỗi xảy ra khi gửi mail. Vui lòng thử lại sau.");
      return
    }

    await handleSendMailToApplicants([selectedApplicant?.userId], jobId);
    setMode(null);
  }

  const onContact = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setMode("invite");
  };

  if (applicants.length === 0) {
    return <Empty>
      <EmptyHeader>
        <EmptyTitle>Không tìm thấy ứng viên phù hợp</EmptyTitle>
        <EmptyDescription>Vui lòng điều chỉnh tiêu chí tìm kiếm hoặc thử lại sau.</EmptyDescription>
      </EmptyHeader>
    </Empty>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {applicants.map((applicant) => (
          <ApplicantGridCard
            key={applicant.userId}
            applicant={applicant}
            onContact={() => onContact(applicant)} />
        ))}
      </div>

      <EmailDialog
        open={!!mode}
        onOpenChange={(open) => !open && setMode(null)}
        mode={mode as "accept" | "reject"}
        isLoading={isLoading}
        applicant={selectedApplicant!}
        onAcceptSubmit={async () => {}}
        onRejectSubmit={async () => {}}
        onInvite={onInvite}
      />
    </>
  );
};
export default ApplicantGrid;
