import { useUser } from "@/hooks/useUser";
import {
  useCountApplicationsQuery,
  useFetchJobByIdQuery,
  useFetchRelatedJobsQuery
} from "@/services/job/jobApi";
import { useCheckSavedJobsQuery } from "@/services/user/userApi";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";

const useDetailJob = (id: string) => {
  const { user, isSignedIn } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useFetchJobByIdQuery(id, {
    skip: !id // Skip if id is not available
  });

  const job = useMemo(() => data?.data, [data]);

  const {
    data: recruiterData,
    isLoading: isLoadingRecruiter,
    isError: isErrorRecruiter
  } = useFetchRecruiterByIdQuery(job?.recruiter.userId || -1, {
    skip: !job || !job.recruiter || !job.recruiter.userId
  });

  const recruiter = useMemo(() => recruiterData?.data, [recruiterData]);

  const { data: checkSavedJobData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [Number(id)]
      },
      {
        skip: !id || !isSignedIn || !user // Skip if job is not available or user is not signed in
      }
    );

  const isSaved = useMemo(() => {
    if (isCheckSavedSuccess && checkSavedJobData) {
      return checkSavedJobData.data?.find(
        (savedJob) => savedJob.jobId === Number(id)
      )?.result || false;
    }
    return false;
  }, [checkSavedJobData, id, isCheckSavedSuccess]);

  const {
    data: relatedJobsData,
    isLoading: isRelatedJobsLoading,
    isError: isRelatedJobsError
  } = useFetchRelatedJobsQuery(
    {
      skills: job?.skills.map((skill) => skill.skillId) || [],
      page: 1,
      size: 10
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

  const { data: checkSavedJobsData } =
    useCheckSavedJobsQuery(
      {
        jobIds: relatedJobs.map(j => j.jobId)
      },
      {
        skip: !relatedJobs || relatedJobs.length === 0 || !isSignedIn || !user // Skip if job is not available or user is not signed in
      }
    );

  const savedJobs = useMemo(() => checkSavedJobsData?.data || [], [checkSavedJobsData]);

  const { data: countApplicationsData } = useCountApplicationsQuery(
    { jobIds: job ? [job.jobId] : [] },
    {
      skip: !job
    }
  );

  const numberOfApplications = useMemo(() => {
    if (countApplicationsData) {
      return (
        countApplicationsData.data?.find((item) => item.jobId == job?.jobId)?.applications || 0
      );
    }
    return 0;
  }, [countApplicationsData, job?.jobId]);

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

    // recruiter
    recruiter,
    isLoadingRecruiter,
    isErrorRecruiter,

    relatedJobs,
    savedJobs,
    isRelatedJobsLoading,
    isRelatedJobsError,

    numberOfApplications,

    // handlers and functions
    handleOpenCVDialog
  };
};

export default useDetailJob;
