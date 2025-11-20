"use client";

import JobGridCard from "@/app/(main)/jobs/components/JobGridCard";
import JobListCard from "@/app/(main)/jobs/components/JobListCard";
import { useUser } from "@/hooks/useUser";
import {
  useCheckSavedJobsQuery,
  useSaveJobsMutation,
  useUnsaveJobsMutation,
} from "@/services/user/userApi";
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
  const [saveJobs, { isSuccess: isSaveSuccess, isError: isSaveError }] =
    useSaveJobsMutation();
  const [unsaveJobs, { isSuccess: isUnsaveSuccess, isError: isUnsaveError }] =
    useUnsaveJobsMutation();
  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [job.jobId],
      },
      {
        skip: !job,
      },
    );
  const { isSignedIn, user } = useUser();
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
