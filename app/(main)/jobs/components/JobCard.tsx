"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import useJobActions from "@/hooks/useJobActions";
import { useUser } from "@/hooks/useUser";
import { useCheckSavedJobsQuery } from "@/services/user/userApi";
import { Job } from "@/types/model";
import { useEffect, useState } from "react";

interface JobCardProps {
  job: Job;
  viewMode: "list" | "grid";
  onLevelClick?: (level: string) => void;
  onWorkingTypeClick?: (workingType: string) => void;
}

export default function JobCard({
  job,
  viewMode,
  onLevelClick,
  onWorkingTypeClick,
}: JobCardProps) {
  const { user, isSignedIn } = useUser();
  const { handleToggleSaveJob } = useJobActions();
  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [job.jobId],
      },
      {
        skip: !job || !isSignedIn || !user,
      },
    );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isCheckSavedSuccess && checkSavedJobsData) {
      const savedStatus = checkSavedJobsData?.data?.find(
        (item) => item.jobId === job.jobId,
      )?.result;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(!!savedStatus);
    }
  }, [isCheckSavedSuccess, checkSavedJobsData, job.jobId]);

  const handleSaveJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleToggleSaveJob(e, job, isSaved, setIsSaved);
  };

  if (viewMode === "grid") {
    return (
      <JobGridCard
        job={job}
        isSaved={isSaved}
        handleSaveJob={handleSaveJob}
        onLevelClick={onLevelClick}
        onWorkingTypeClick={onWorkingTypeClick}
      />
    );
  }

  // List view
  return (
    <JobListCard
      job={job}
      isSaved={isSaved}
      handleSaveJob={handleSaveJob}
      onLevelClick={onLevelClick}
      onWorkingTypeClick={onWorkingTypeClick}
    />
  );
}
