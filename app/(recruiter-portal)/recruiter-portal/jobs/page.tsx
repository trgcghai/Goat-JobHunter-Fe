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

const RecruiterJobPage = () => {
  const {
    jobs,
    meta,
    isLoading,
    page,
    size,
    filters,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  } = useJobManagement();

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

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoaderSpin />
            </div>
          ) : (
            <>
              <JobsTable jobs={jobs} />

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
