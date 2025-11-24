import { useUser } from "@/hooks/useUser";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "@/services/job/jobApi";
import {
  useSaveJobsMutation,
  useUnsaveJobsMutation,
} from "@/services/user/userApi";
import { Job } from "@/types/model";
import { useCallback } from "react";
import { toast } from "sonner";

const useJobActions = () => {
  const { user, isSignedIn } = useUser();
  const [saveJobs, { isSuccess: isSaveSuccess, isError: isSaveError }] =
    useSaveJobsMutation();
  const [unsaveJobs, { isSuccess: isUnsaveSuccess, isError: isUnsaveError }] =
    useUnsaveJobsMutation();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

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

  // Create new job
  const handleCreateJob = useCallback(
    async (jobData: any) => {
      try {
        const response = await createJob(jobData).unwrap();

        if (response.data) {
          toast.success("Tạo công việc thành công!", {
            description: `Đã tạo công việc: ${jobData.title}`,
          });
          return response.data;
        }
      } catch (error) {
        console.error("Failed to create job:", error);
        toast.error("Không thể tạo công việc. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [createJob],
  );

  // Delete job
  const handleDeleteJob = useCallback(
    async (jobId: number, jobTitle?: string) => {
      try {
        const response = await deleteJob(jobId.toString()).unwrap();

        if (response.data) {
          toast.success("Xóa công việc thành công!", {
            description: jobTitle ? `Đã xóa: ${jobTitle}` : undefined,
          });
          return response.data;
        }
      } catch (error) {
        console.error("Failed to delete job:", error);
        toast.error("Không thể xóa công việc. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [deleteJob],
  );

  // Update existing job
  const handleUpdateJob = useCallback(
    async (jobId: number, jobData: any) => {
      try {
        const response = await updateJob({ jobId, ...jobData }).unwrap();

        if (response.data) {
          toast.success("Cập nhật công việc thành công!", {
            description: `Đã cập nhật: ${jobData.title}`,
          });
          return response.data;
        }
      } catch (error) {
        console.error("Failed to update job:", error);
        toast.error("Không thể cập nhật công việc. Vui lòng thử lại sau.");
        throw error;
      }
    },
    [updateJob],
  );

  return {
    isCreating,
    isDeleting,
    isUpdating,

    handleUnsaveJob,
    handleToggleSaveJob,
    handleCreateJob,
    handleUpdateJob,
    handleDeleteJob,
  };
};

export default useJobActions;
