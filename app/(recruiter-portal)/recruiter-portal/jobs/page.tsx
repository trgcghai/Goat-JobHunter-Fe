"use client";

import JobsTable from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobsTable";
import RecruiterJobFilter from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/RecruiterJobFilter";
import { useJobManagement } from "@/app/(recruiter-portal)/recruiter-portal/jobs/hooks/useJobManagement";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import LoaderSpin from "@/components/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Job } from "@/types/model";
import JobActions from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobActions";
import ErrorMessage from "@/components/ErrorMessage";

const RecruiterJobPage = () => {
  const {
    jobs,
    meta,
    isLoading,
    isError,
    page,
    size,
    filters,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  } = useJobManagement({});
  const [selectedItems, setSelectedItems] = useState<Job[]>([]);

  return (
    <div className="space-y-6">
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
              <Plus className="h-4 w-4 mr-2" />
              Thêm công việc mới
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <RecruiterJobFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />

          {isError && <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau."} />}

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoaderSpin />
            </div>
          ) : (
            <>
              <JobActions
                selectedCount={selectedItems.length}
                selectedIds={selectedItems.map(j => j.jobId)}
              />

              <JobsTable jobs={jobs} onSelectionChange={setSelectedItems} />

              <DataTablePagination
                currentPage={page}
                totalPages={meta.pages}
                pageSize={size}
                totalItems={meta.total}
                currentItemsCount={jobs.length}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruiterJobPage;
