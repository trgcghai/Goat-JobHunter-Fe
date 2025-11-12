"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import { Job } from "@/types/model";
import { useState } from "react";

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
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    // TODO: Call API to save/unsave job
    console.log(isSaved ? "Unsaving job:" : "Saving job:", job.jobId);
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
