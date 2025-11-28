"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoaderSpin from "@/components/LoaderSpin";
import useExploreSuitableApplicants
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/hooks/useExploreSuitableApplicants";
import SuitableApplicantFilter
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/SuitableApplicantFilter";
import ApplicantTable from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/ApplicantTable";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3, TableIcon } from "lucide-react";
import { Applicant } from "@/types/model";
import SuitableApplicantActions
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/SuitableApplicantActions";
import ApplicantGrid from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/ApplicantGrid";
import ErrorMessage from "@/components/ErrorMessage";

const ExploreApplicants = () => {
  const {
    applicants,
    isLoading,
    isError,
    filters,
    page,
    meta,
    size,
    setPage,
    setSize,
    handleFilterChange,
    resetFilters
  } = useExploreSuitableApplicants();
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [selectedItems, setSelectedItems] = useState<Applicant[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Khám phá ứng viên</h1>
            <p className="text-sm text-muted-foreground">
              Kết nối với các ứng viên tiềm năng phù hợp với yêu cầu tuyển dụng của bạn.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <SuitableApplicantFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />

          {isError && <ErrorMessage message={"Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau."} />}

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoaderSpin />
            </div>
          ) : (
            <>
              <div className="flex gap-2 justify-end mb-4">
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-xl"
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>

              <SuitableApplicantActions selectedCount={selectedItems.length}
                                        selectedIds={(selectedItems.map(item => item.userId))} />

              {viewMode == "table" && <ApplicantTable applicants={applicants} onSelectionChange={setSelectedItems} />}

              {viewMode == "grid" &&
                <ApplicantGrid applicants={applicants} />
              }

              <DataTablePagination
                currentPage={page}
                totalPages={meta.pages}
                pageSize={size}
                totalItems={meta.total}
                currentItemsCount={applicants.length}
                onPageChange={setPage}
                onSizeChange={setSize}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default ExploreApplicants;
