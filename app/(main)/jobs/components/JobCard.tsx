"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import { useUser } from "@/hooks/useUser";
import { useSaveJobsMutation } from "@/services/user/userApi";
import { Job } from "@/types/model";
import { useState } from "react";
import { toast } from "sonner";

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
  const [saveJobs, { isSuccess, isError }] = useSaveJobsMutation();
  const { isSignedIn, user } = useUser();

  const handleSaveJob = async (e: React.MouseEvent) => {
    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    // TODO: Call API to save/unsave job
    console.log(isSaved ? "Unsaving job:" : "Saving job:", job.jobId);

    await saveJobs({ userId: user.userId, savedJobs: [{ jobId: job.jobId }] });

    if (isSuccess) {
      toast.success(
        isSaved ? "Đã bỏ lưu công việc." : "Đã lưu công việc thành công.",
      );
    }

    if (isError) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      setIsSaved(!isSaved); // Revert state on error
    }
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
