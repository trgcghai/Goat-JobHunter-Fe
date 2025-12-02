import { useUser } from "@/hooks/useUser";
import {
  useFetchJobsByRecruiterQuery
} from "@/services/job/jobApi";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";
import {
  useCheckRecruitersFollowedQuery,
  useCheckSavedJobsQuery
} from "@/services/user/userApi";
import { useMemo } from "react";

const useDetailRecruiter = (id: string) => {
  const { user, isSignedIn } = useUser();

  const {
    data: recruiterResp,
    isLoading: isRecruiterLoading,
    isError: isRecruiterError
  } = useFetchRecruiterByIdQuery(Number(id), {
    skip: !Number(id)
  });

  const recruiter = useMemo(() => recruiterResp?.data, [recruiterResp]);

  const {
    data: jobsResp,
    isLoading: isJobsLoading,
    isError: isJobsError
  } = useFetchJobsByRecruiterQuery(
    { page: 1, size: 100, recruiterId: Number(id) },
    { skip: !Number(id) }
  );

  const recruiterJobs = useMemo(
    () => jobsResp?.data?.result || [],
    [jobsResp]
  );

  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: recruiterJobs.map((j) => j.jobId)
      },
      {
        skip: !recruiterJobs.length || !isSignedIn || !user
      }
    );

  const savedJobs = useMemo(
    () => (isCheckSavedSuccess ? checkSavedJobsData?.data || [] : []),
    [checkSavedJobsData, isCheckSavedSuccess]
  );

  const { data: checkFollowedData, isSuccess: isCheckFollowedSuccess } =
    useCheckRecruitersFollowedQuery(
      {
        recruiterIds: [Number(id)]
      },
      {
        skip: !id || !isSignedIn || !user
      }
    );

  const isFollowed = useMemo(() => {
    if (isCheckFollowedSuccess && checkFollowedData) {
      return (
        checkFollowedData.data?.find(
          (followed) => followed.recruiterId === Number(id)
        )?.result || false
      );
    }
    return false;
  }, [checkFollowedData, id, isCheckFollowedSuccess]);

  return {
    // Recruiter data
    recruiter,
    isRecruiterLoading,
    isRecruiterError,

    // Jobs data
    recruiterJobs,
    isJobsLoading,
    isJobsError,

    // Saved jobs
    savedJobs,

    // Follow state
    isFollowed,

    // User data
    user,
    isSignedIn
  };
};

export default useDetailRecruiter;