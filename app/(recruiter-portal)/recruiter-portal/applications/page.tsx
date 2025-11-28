"use client";
import ApplicationFilter from "@/app/(recruiter-portal)/recruiter-portal/applications/components/ApplicationFilter";
import ApplicationsTable from "@/app/(recruiter-portal)/recruiter-portal/applications/components/ApplicationsTable";
import { useApplicationManagement } from "@/app/(recruiter-portal)/recruiter-portal/applications/hooks/useApplicationManagement";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import LoaderSpin from "@/components/LoaderSpin";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ApplicationActions from "@/app/(recruiter-portal)/recruiter-portal/applications/components/ApplicationActions";
import { useState } from "react";
import { Application } from "@/types/model";

const ApplicationsManagement = () => {
  const {
    applications,
    meta,
    isLoading,
    page,
    size,
    filters,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  } = useApplicationManagement();
  const [selectedItems, setSelectedItems] = useState<Application[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Danh sách các đơn ứng tuyển</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý các đơn ứng tuyển từ ứng viên cho các vị trí tuyển dụng
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ApplicationFilter
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
              <ApplicationActions
                selectedCount={selectedItems.length}
                selectedIds={selectedItems.map(item => item.applicationId)}
              />

              <ApplicationsTable applications={applications} onSelectionChange={setSelectedItems} />

              <DataTablePagination
                currentPage={page}
                totalPages={meta.pages}
                pageSize={size}
                totalItems={meta.total}
                currentItemsCount={applications.length}
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

export default ApplicationsManagement;
