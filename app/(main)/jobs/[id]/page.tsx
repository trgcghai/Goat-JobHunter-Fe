"use client";

import {
  JobHeader,
  JobInfoGrid,
  JobInfoSidebar,
  RelatedJobs,
} from "@/app/(main)/jobs/[id]/components";
import ErrorMessage from "@/components/ErrorMessage";
import LoaderSpin from "@/components/LoaderSpin";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { useFetchJobByIdQuery, useFetchJobsQuery } from "@/services/job/jobApi";
import { BookmarkPlus, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError, isSuccess } = useFetchJobByIdQuery(
    params.id,
    {
      skip: !params.id,
    },
  );

  const {
    data: relatedJobs,
    isLoading: isRelatedJobsLoading,
    isError: isRelatedJobsError,
  } = useFetchJobsQuery({ page: 1, limit: 5 }, { skip: !params.id });

  const job = useMemo(() => data?.data, [data]);

  console.log(job);

  const handleApply = () => {
    console.log("Ứng tuyển vào công việc: " + job?.title);
  };

  const handleSave = () => {
    console.log("Lưu công việc: " + job?.title);
  };

  if (!job) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Không tìm thấy công việc</EmptyTitle>
          <EmptyDescription>
            Công việc bạn đang tìm kiếm không tồn tại. Hãy thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
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

        {isLoading && <LoaderSpin />}

        {isError && (
          <ErrorMessage message="Có lỗi xảy ra khi tải thông tin công việc. Vui lòng thử lại sau." />
        )}

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
                      onClick={handleSave}
                      variant="outline"
                      className="w-full text-base flex items-center justify-center gap-2 rounded-xl border-border"
                    >
                      <BookmarkPlus className="w-5 h-5" />
                      Lưu Việc Làm
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
