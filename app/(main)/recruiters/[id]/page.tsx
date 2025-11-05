"use client";

import {
  RecruiterHeader,
  RecruiterInfo,
  RecruiterJobs,
} from "@/app/(main)/recruiters/[id]/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { allJobs, allRecruiter } from "@/constants/sample";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecruiterDetailPage() {
  const params = useParams<{ id: string }>();
  const recruiter = allRecruiter.find((r) => r.userId == params.id);

  if (!recruiter) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Không tìm thấy nhà tuyển dụng
            </h1>
            <Link href="/recruiters">
              <Button>Quay lại trang nhà tuyển dụng</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Filter jobs by recruiter
  const recruiterJobs = allJobs.slice(0, 10);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 py-0">
              <CardHeader className="p-6">
                <RecruiterHeader
                  recruiter={recruiter}
                  recruiterJobs={recruiterJobs}
                />
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <Separator className="mb-6" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Giới Thiệu Công Ty
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {recruiter.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <RecruiterInfo recruiter={recruiter} recruiterJobs={recruiterJobs} />
        </div>

        {recruiterJobs.length > 0 && (
          <RecruiterJobs recruiterJobs={recruiterJobs} />
        )}
      </div>
    </main>
  );
}
