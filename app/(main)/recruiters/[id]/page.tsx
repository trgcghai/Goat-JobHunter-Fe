"use client";

import {
  RecruiterHeader,
  RecruiterInfo,
  RecruiterJobs
} from "@/app/(main)/recruiters/[id]/components";
import useDetailRecruiter from "@/app/(main)/recruiters/[id]/hooks/useDetailRecruiter";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecruiterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    recruiter,
    isRecruiterLoading,
    isRecruiterError,
    recruiterJobs,
    isJobsLoading,
    savedJobs,
    isFollowed
  } = useDetailRecruiter(id);

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
            <Card className="p-6">
              <RecruiterHeader recruiter={recruiter} isFollowed={isFollowed} />

              <Separator className="mb-6" />

              <div className="flex-1 pb-6">
                <h2 className="text-xl font-bold text-foreground mb-4 capitalize">
                  Mô tả
                </h2>
                {recruiter.description ? <MarkdownDisplay
                    content={recruiter.description}
                    className="prose max-w-none rounded text-sm text-foreground line-clamp-2 mb-4"
                  /> :
                  <p className="text-sm text-muted-foreground">Nhà tuyển dụng chưa cung cấp thông tin mô tả.</p>}
              </div>
            </Card>
          </div>

          <RecruiterInfo recruiter={recruiter} recruiterJobs={recruiterJobs} />
        </div>

        {isJobsLoading ? (
          <div className="mt-12">
            <LoaderSpin />
          </div>
        ) : recruiterJobs.length > 0 ? (
          <RecruiterJobs recruiterJobs={recruiterJobs} savedJobs={savedJobs} />
        ) : (
          <div className="mt-12">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Chưa có công việc nào</EmptyTitle>
                <EmptyDescription>
                  Nhà tuyển dụng này chưa đăng công việc nào.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </main>
  );
}