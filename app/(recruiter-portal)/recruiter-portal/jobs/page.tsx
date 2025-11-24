"use client";

import JobsTable from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetchJobsByCurrentRecruiterQuery } from "@/services/job/jobApi";
import { Plus } from "lucide-react";
import Link from "next/link";

const RecruiterJobPage = () => {
  const { data } = useFetchJobsByCurrentRecruiterQuery({
    page: 1,
    size: 20,
  });

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Danh sách công việc</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý các công việc bạn đã đăng tuyển
          </p>
        </div>

        <Link href="/recruiter-portal/jobs/form">
          <Button className="rounded-xl">
            <Plus className="h-4 w-4" />
            Thêm công việc mới
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <JobsTable jobs={data?.data?.result || []} />
      </CardContent>
    </Card>
  );
};

export default RecruiterJobPage;
