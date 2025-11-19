"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import { useUser } from "@/hooks/useUser";
import { useSaveJobsMutation } from "@/services/user/userApi";
import { Job } from "@/types/model";
import { useEffect, useState } from "react";
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
  const [saveJobs, { isSuccess, isError }] = useSaveJobsMutation();
  const { isSignedIn, user } = useUser();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      const saved = user.savedJobs.some(
        (savedJob) => savedJob.jobId === job.jobId,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(saved);
    }
  }, [isSignedIn, job.jobId, user]);

  const handleSaveJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    setIsSaved(!isSaved);

    if (isSaved) {
      await saveJobs({
        userId: user.userId,
        savedJobs: user.savedJobs
          .filter((job) => job.jobId !== job.jobId)
          .map((j) => ({ jobId: j.jobId })),
      });
    } else {
      await saveJobs({
        userId: user.userId,
        savedJobs: [
          ...user.savedJobs.map((j) => ({ jobId: j.jobId })),
          { jobId: job.jobId },
        ],
      });
    }

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
