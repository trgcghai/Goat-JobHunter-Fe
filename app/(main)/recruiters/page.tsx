"use client";

import {
  RecruiterFilter,
  RecruiterList,
} from "@/app/(main)/recruiters/components";
import useRecruitersFilter from "@/app/(main)/recruiters/hooks/useRecruitersFilter";
import CustomPagination from "@/components/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3x3, List, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RecruitersPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const itemsPerPage = viewMode === "grid" ? 9 : 10;

  const {
    recruiters,
    isLoading,
    isFetching,
    isError,
    filters,
    handleFilterChange,
    resetFilters,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    activeFiltersCount,
  } = useRecruitersFilter({
    itemsPerPage,
    initialFilters: {
      fullName: "",
      address: undefined,
    },
  });

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-primary/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6">
          <RecruiterFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Hiển thị{" "}
                  <span className="font-semibold text-foreground">
                    {recruiters.length}
                  </span>{" "}
                  trong{" "}
                  <span className="font-semibold text-foreground">
                    {totalItems}
                  </span>{" "}
                  nhà tuyển dụng
                </p>
                {isFetching && !isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                >
                  <List className="h-4 w-4" />
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
            </div>

            {isLoading && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            )}

            {isError && (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Có lỗi xảy ra</EmptyTitle>
                  <EmptyDescription>
                    Không thể tải danh sách nhà tuyển dụng. Vui lòng thử lại
                    sau.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}

            {!isLoading && !isError && recruiters.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Không tìm thấy nhà tuyển dụng</EmptyTitle>
                  <EmptyDescription>
                    Không tìm thấy nhà tuyển dụng nào khớp với yêu cầu của bạn
                  </EmptyDescription>
                </EmptyHeader>
                {activeFiltersCount > 0 && (
                  <Button onClick={resetFilters}>Xóa bộ lọc</Button>
                )}
              </Empty>
            )}

            {!isLoading && !isError && recruiters.length > 0 && (
              <RecruiterList recruiters={recruiters} viewMode={viewMode} />
            )}

            {!isLoading && (
              <div className="mt-8">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onNextPage={nextPage}
                  onPreviousPage={previousPage}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  visiblePageRange={2}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
