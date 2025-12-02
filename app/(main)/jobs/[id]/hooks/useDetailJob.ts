import { useUser } from "@/hooks/useUser";
import {
  useFetchJobByIdQuery,
  useFetchRelatedJobsQuery
} from "@/services/job/jobApi";
import { useCheckSavedJobsQuery } from "@/services/user/userApi";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const useDetailJob = (id: string) => {
  const { user, isSignedIn } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useFetchJobByIdQuery(id, {
    skip: !id // Skip if id is not available
  });

  const job = useMemo(() => data?.data, [data]);

  const {
    data: relatedJobsData,
    isLoading: isRelatedJobsLoading,
    isError: isRelatedJobsError
  } = useFetchRelatedJobsQuery(
    {
      skills: job?.skills.map((skill) => skill.skillId) || []
    },
    { skip: !id || !job || !job.skills }
  );

  const relatedJobs = useMemo(
    () =>
      (relatedJobsData?.data?.result || []).filter(
        (job) => job.jobId.toString() != id
      ),
    [id, relatedJobsData?.data?.result]
  );

  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [Number(id)]
      },
      {
        skip: !id || !isSignedIn || !user // Skip if job is not available or user is not signed in
      }
    );

  const isSaved = useMemo(() => {
    if (isCheckSavedSuccess && checkSavedJobsData) {
      return checkSavedJobsData.data?.find(
        (savedJob) => savedJob.jobId === Number(id)
      )?.result || false;
    }
    return false;
  }, [checkSavedJobsData, id, isCheckSavedSuccess]);

  const handleOpenCVDialog = () => {
    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (!job) {
      toast.error("Có lỗi khi ứng tuyển công việc. Vui lòng thử lại sau.");
      return;
    }

    setIsDialogOpen(true);
  };

  return {
    // states
    isSaved,
    isDialogOpen,
    setIsDialogOpen,

    // data from api
    job,
    isLoading,
    isError,
    isSuccess,
    relatedJobs,
    isRelatedJobsLoading,
    isRelatedJobsError,

    // handlers and functions
    handleOpenCVDialog,
  };
};

export default useDetailJob;
