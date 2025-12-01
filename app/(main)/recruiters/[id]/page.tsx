"use client";

import {
  RecruiterHeader,
  RecruiterInfo,
  RecruiterJobs
} from "@/app/(main)/recruiters/[id]/components";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { useFetchJobsByRecruiterQuery } from "@/services/job/jobApi";
import { useFetchRecruiterByIdQuery } from "@/services/recruiter/recruiterApi";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function RecruiterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: recruiterResp,
    isLoading: isRecruiterLoading,
    isError: isRecruiterError
  } = useFetchRecruiterByIdQuery(Number(id), {
    skip: !Number(id)
  });

  const { data: jobsResp, isLoading: isJobsLoading } =
    useFetchJobsByRecruiterQuery(
      { page: 1, size: 100, recruiterId: Number(id) }, // Changed limit to size, increased to get all jobs
      { skip: !Number(id) }
    );

  const recruiter = useMemo(() => {
    return recruiterResp?.data;
  }, [recruiterResp]);

  const recruiterJobs = useMemo(() => {
    const jobs = jobsResp?.data?.result || [];
    // Filter jobs by current recruiter ID
    return jobs.filter(
      (job) => job.recruiter?.userId == Number(id)
    );
  }, [jobsResp, id]);

  if (!recruiter && (isRecruiterLoading || isRecruiterError === false)) {
    return <LoaderSpin />;
  }

  if (!recruiter && isRecruiterError) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message="Không thể tải thông tin nhà tuyển dụng. Vui lòng thử lại sau." />
        </div>
      </main>
    );
  }

  if (!recruiter) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Không tìm thấy nhà tuyển dụng</EmptyTitle>
          <EmptyDescription>
            Nhà tuyển dụng bạn đang tìm kiếm không tồn tại. Hãy thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/recruiters"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại trang nhà tuyển dụng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
          <div className="lg:col-span-2">
            <Card className="mb-8 py-0 h-full flex flex-col">
              <CardHeader className="p-6">
                <RecruiterHeader
                  recruiter={recruiter}
                  recruiterJobs={recruiterJobs}
                />
              </CardHeader>

              <CardContent className="px-6 pb-6 flex-1">
                <Separator className="mb-6" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Giới Thiệu Công Ty
                  </h2>
                  {recruiter.description ? (
                    <MarkdownDisplay
                      content={recruiter.description}
                      className="text-muted-foreground whitespace-pre-line"
                    />
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">
                      Không có mô tả
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <RecruiterInfo recruiter={recruiter} recruiterJobs={recruiterJobs} />
        </div>

        {isJobsLoading ? (
          <div className="mt-12">
            <LoaderSpin />
          </div>
        ) : recruiterJobs.length > 0 ? (
          <RecruiterJobs recruiterJobs={recruiterJobs} />
        ) : (
          <div className="mt-12">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Chưa có việc làm</EmptyTitle>
                <EmptyDescription>
                  Nhà tuyển dụng này chưa đăng tuyển việc làm nào.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </main>
  );
}
