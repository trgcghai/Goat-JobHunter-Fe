import { useUser } from "@/hooks/useUser";
import {
  useSaveJobsMutation,
  useUnsaveJobsMutation,
} from "@/services/user/userApi";
import { Job } from "@/types/model";
import { toast } from "sonner";

const useJobActions = () => {
  const { user, isSignedIn } = useUser();
  const [saveJobs, { isSuccess: isSaveSuccess, isError: isSaveError }] =
    useSaveJobsMutation();
  const [unsaveJobs, { isSuccess: isUnsaveSuccess, isError: isUnsaveError }] =
    useUnsaveJobsMutation();

  const handleUnsaveJob = async (job: Job | null) => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (!job) {
      toast.error("Có lỗi khi lưu công việc. Vui lòng thử lại sau.");
      return;
    }

    await unsaveJobs({
      jobIds: [job.jobId],
    });

    if (isUnsaveSuccess) {
      toast.success("Đã bỏ lưu công việc.");
    }

    if (isUnsaveError) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleToggleSaveJob = async (
    e: React.MouseEvent,
    job: Job,
    isSaved: boolean,
    setIsSaved: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    setIsSaved(!isSaved);

    if (isSaved) {
      await unsaveJobs({
        jobIds: [job.jobId],
      });
    } else {
      await saveJobs({
        jobIds: [job.jobId],
      });
    }

    if (isSaveSuccess || isUnsaveSuccess) {
      toast.success(
        isSaved ? "Đã bỏ lưu công việc." : "Đã lưu công việc thành công.",
      );
    }

    if (isSaveError || isUnsaveError) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      setIsSaved(!isSaved); // Revert state on error
    }
  };

  return { handleUnsaveJob, handleToggleSaveJob };
};

export default useJobActions;
