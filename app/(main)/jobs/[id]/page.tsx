"use client";

import {
  JobHeader,
  JobInfoGrid,
  JobInfoSidebar,
  RelatedJobs
} from "@/app/(main)/jobs/[id]/components";
import ResumeDialog from "@/app/(main)/jobs/[id]/components/ResumeDialog";
import useDetailJob from "@/app/(main)/jobs/[id]/hooks/useDetailJob";
import LoaderSpin from "@/components/common/LoaderSpin";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import useJobActions from "@/hooks/useJobActions";
import { BookmarkPlus, ChevronLeft, Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import RecruiterInfo from "@/app/(main)/jobs/[id]/components/RecruiterInfo";
import ErrorMessage from "@/components/common/ErrorMessage";
import { HasApplicant } from "@/components/common/HasRole";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();

  const { user } = useUser();
  const { handleToggleSaveJob } = useJobActions();
  const {
    isDialogOpen,
    setIsDialogOpen,

    job,
    isSaved,
    isLoading,
    isError,
    isSuccess,

    recruiter,
    isLoadingRecruiter,
    isErrorRecruiter,

    relatedJobs,
    savedJobs,
    isRelatedJobsLoading,
    isRelatedJobsError,

    numberOfApplications,

    handleOpenCVDialog
  } = useDetailJob(params.id);

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

                  {recruiter && !isLoadingRecruiter && !isErrorRecruiter ? <RecruiterInfo recruiter={recruiter} /> :
                    <ErrorMessage message={"Có lỗi xảy ra khi tải thông tin nhà tuyển dụng."} />}

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
                    <HasApplicant user={user!}>
                      <Button
                        onClick={handleOpenCVDialog}
                        disabled={!job.active}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-xl"
                      >
                        <Send className="w-5 h-5" />
                        {!job.active ? "Đã Đóng" : "Ứng Tuyển Ngay"}
                      </Button>
                    </HasApplicant>

                    <Button
                      onClick={(e) =>
                        handleToggleSaveJob(e, job, isSaved)
                      }
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
                  <JobInfoSidebar
                    job={job}
                    numberOfApplications={numberOfApplications}
                  />
                </Card>
              </div>
            </div>
            <RelatedJobs
              jobs={relatedJobs || []}
              isLoading={isRelatedJobsLoading}
              isError={isRelatedJobsError}
              savedJobs={savedJobs}
            />
          </>
        )}
      </div>

      {job && (
        <ResumeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          job={job}
          userId={user?.userId}
          userEmail={user?.contact.email}
        />
      )}
    </main>
  );
}
