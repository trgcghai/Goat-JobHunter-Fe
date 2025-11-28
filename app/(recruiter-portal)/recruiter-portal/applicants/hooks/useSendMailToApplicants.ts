import { useSendInvitationEmailMutation } from "@/services/email/emailApi";
import { toast } from "sonner";

const useSendMailToApplicants = () => {
  const [sendEmail, { isLoading }] = useSendInvitationEmailMutation();

  const handleSendMailToApplicants = async (applicantIds: number[], jobId: number) => {
    console.log({
      applicantIds,
      jobId
    });
    try {

      await sendEmail({
        applicantIds,
        jobId,
      }).unwrap();

      toast.success("Đã gửi email mời phỏng vấn thành công đến ứng viên.");

    } catch (e) {
      toast.error("Đã có lỗi xảy ra khi gửi email mời phỏng vấn. Vui lòng thử lại.");
      console.error(e);
    }
  }

  return {
    handleSendMailToApplicants,
    isLoading,
  }
};
export default useSendMailToApplicants;
