"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import useJobActions from "@/hooks/useJobActions";
import { Job } from "@/types/model";

interface JobCardProps {
  job: Job;
  viewMode: "list" | "grid";
  isSaved: boolean;
  onLevelClick?: (level: string) => void;
  onWorkingTypeClick?: (workingType: string) => void;
}

export default function JobCard({
  job,
  viewMode,
  isSaved,
  onLevelClick,
  onWorkingTypeClick,
}: JobCardProps) {
  const { handleToggleSaveJob } = useJobActions();

  const handleSaveJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await handleToggleSaveJob(e, job, isSaved);
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
