"use client";

import { recruiterJobColumns } from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobColumnConfig";
import { DataTable } from "@/components/dataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Job } from "@/types/model";
import { Plus } from "lucide-react";

interface JobsTableProps {
  jobs: Job[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Danh sách công việc</h1>
          <p className="text-sm text-muted-foreground">
            Quản lý các công việc bạn đã đăng tuyển
          </p>
        </div>

        <Button className="rounded-xl">
          <Plus className="h-4 w-4" />
          Thêm công việc mới
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={recruiterJobColumns} data={jobs} />
      </CardContent>
    </Card>
  );
}
