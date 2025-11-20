"use client";

import {
  JobHeader,
  JobInfoGrid,
  JobInfoSidebar,
  RelatedJobs,
} from "@/app/(main)/jobs/[id]/components";
import LoaderSpin from "@/components/LoaderSpin";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { useFetchJobByIdQuery, useFetchJobsQuery } from "@/services/job/jobApi";
import {
  useCheckSavedJobsQuery,
  useSaveJobsMutation,
  useUnsaveJobsMutation,
} from "@/services/user/userApi";
import { BookmarkPlus, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  const { user, isSignedIn } = useUser();
  const [saveJobs, { isSuccess: isSaveSuccess, isError: isSaveError }] =
    useSaveJobsMutation();
  const [unsaveJobs, { isSuccess: isUnsaveSuccess, isError: isUnsaveError }] =
    useUnsaveJobsMutation();

  const { data, isLoading, isError, isSuccess } = useFetchJobByIdQuery(
    params.id,
    {
      skip: !params.id,
    },
  );
  const job = useMemo(() => data?.data, [data]);

  const { data: checkSavedJobsData, isSuccess: isCheckSavedSuccess } =
    useCheckSavedJobsQuery(
      {
        jobIds: [job?.jobId as number],
      },
      {
        skip: !job || !isSignedIn || !user,
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
    data: relatedJobs,
    isLoading: isRelatedJobsLoading,
    isError: isRelatedJobsError,
  } = useFetchJobsQuery({ page: 1, limit: 5 }, { skip: !params.id });

  const handleApply = () => {
    console.log("Ứng tuyển vào công việc: " + job?.title);
  };

  const handleToggleSave = async () => {
    if (!isSignedIn || !user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (!job) {
      toast.error("Có lỗi khi lưu công việc. Vui lòng thử lại sau.");
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

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (!job || isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Có lỗi xảy ra khi tải thông tin công việc</EmptyTitle>
          <EmptyDescription>
            Vui lòng thử lại sau hoặc quay lại trang việc làm.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/jobs" className="text-primary hover:underline">
            Quay lại trang việc làm
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/jobs"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại trang việc làm
        </Link>

        {job && isSuccess && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <Card className="mb-8 py-0 h-full">
                  <JobHeader job={job} />

                  <CardContent className="px-6 pb-6">
                    <Separator className="mb-4" />
                    <JobInfoGrid job={job} />

                    <Separator className="mb-4" />

                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-4 capitalize">
                        Mô Tả Công Việc
                      </h2>
                      <MarkdownDisplay
                        content={job.description}
                        className="prose max-w-none rounded text-sm text-foreground line-clamp-2 mb-4"
                      />
                    </div>

                    <Separator className="my-6" />
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-4 capitalize">
                        Kỹ Năng Yêu Cầu
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {(job?.skills || []).map((skill) => (
                          <Badge
                            key={skill.skillId}
                            variant="outline"
                            className="text-sm"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="p-6 h-full">
                  <div className="space-y-3">
                    <Button
                      onClick={handleApply}
                      disabled={!job.active}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-xl"
                    >
                      {!job.active ? "Đã Đóng" : "Ứng Tuyển Ngay"}
                    </Button>

                    <Button
                      onClick={handleToggleSave}
                      variant="outline"
                      className="w-full text-base flex items-center justify-center gap-2 rounded-xl border-border"
                    >
                      <BookmarkPlus
                        className="w-5 h-5"
                        fill={isSaved ? "currentColor" : "none"}
                      />
                      {isSaved ? "Bỏ Lưu Công Việc" : "Lưu Công Việc"}
                    </Button>
                  </div>
                  <JobInfoSidebar job={job} />
                </Card>
              </div>
            </div>
            <RelatedJobs
              jobs={relatedJobs?.data?.result || []}
              isLoading={isRelatedJobsLoading}
              isError={isRelatedJobsError}
            />
          </>
        )}
      </div>
    </main>
  );
}
