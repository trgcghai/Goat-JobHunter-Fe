import { useUser } from "@/hooks/useUser";
import {
  useFetchJobByIdQuery,
  useFetchRelatedJobsQuery,
} from "@/services/job/jobApi";
import { useCheckSavedJobsQuery } from "@/services/user/userApi";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const useDetailJob = (id: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user, isSignedIn } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useFetchJobByIdQuery(id, {
    skip: !id, // Skip if id is not available
  });
  const job = useMemo(() => data?.data, [data]);

  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [Number(id)],
      },
      {
        skip: !job || !isSignedIn || !user, // Skip if job is not available or user is not signed in
      },
    );

  useEffect(() => {
    if (isCheckSavedSuccess && checkSavedJobsData) {
      const savedStatus = checkSavedJobsData?.data?.find(
        (item) => item.jobId === job?.jobId,
      )?.result;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(!!savedStatus);
    }
  }, [isCheckSavedSuccess, checkSavedJobsData, job?.jobId]);

  const {
    data: relatedJobsData,
    isLoading: isRelatedJobsLoading,
    isError: isRelatedJobsError,
  } = useFetchRelatedJobsQuery(
    {
      skills: job?.skills.map((skill) => skill.name) || [],
    },
    { skip: !id || !job || !job.skills }, // Skip if job or skills are not available
  );

  const relatedJobs = useMemo(
    () =>
      (relatedJobsData?.data?.result || []).filter(
        (job) => job.jobId.toString() != id,
      ),
    [id, relatedJobsData?.data?.result],
  );

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
    setIsSaved,
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

    // user info
    user,
  };
};

export default useDetailJob;
