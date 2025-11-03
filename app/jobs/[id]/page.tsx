"use client";

import {
  JobHeader,
  JobInfoGrid,
  JobInfoSidebar,
  RelatedJobs,
} from "@/app/jobs/[id]/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { allJobs } from "@/constants/sample";
import { BookmarkPlus, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const job = allJobs.find((j) => j.jobId === jobId);

  const handleApply = () => {
    // TODO: Submit application to API
    console.log("Applying to job:", jobId);
  };

  const handleSave = () => {
    // TODO: Save/unsave job to database
    console.log("Saving job:", jobId);
  };

  if (!job) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Không tìm thấy công việc
            </h1>
            <Link href="/jobs">
              <Button>Quay lại trang việc làm</Button>
            </Link>
          </div>
        </div>
      </main>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 py-0">
              <JobHeader job={job} />

              <CardContent className="px-6 pb-6">
                <Separator className="mb-4" />
                <JobInfoGrid job={job} />
                <Separator className="my-4" />

                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Mô Tả Công Việc
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {job?.description}
                  </p>
                </div>

                <Separator className="my-6" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
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
            <div className="sticky top-24 space-y-6">
              <Card className="p-6">
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

              <RelatedJobs currentJob={job} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
