"use client";

import { JobFilter, JobList } from "@/app/(main)/jobs/components";
import useJobsFilter from "@/app/(main)/jobs/hooks/useJobsFilter";
import CustomPagination from "@/components/common/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3x3, List, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useCheckSavedJobsQuery } from "@/services/user/savedJobsApi";
import { useUser } from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const itemsPerPage = viewMode === "grid" ? 9 : 10;

  const searchParams = useSearchParams();
  const initLevel = useMemo(() => searchParams.get("level") ? [searchParams.get("level") as string] : [], [searchParams]);
  const initWorkingType = useMemo(() => searchParams.get("workingType") ? [searchParams.get("workingType") as string] : [], [searchParams]);

  const { user, isSignedIn } = useUser();
  const {
    jobs,
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

    // Skills props can be used in JobFilter
    skillsData,
    isFetchingSkills,
    skillInputValue,
    handleSkillInputChange
  } = useJobsFilter({
    itemsPerPage,
    initialFilters: {
      location: [],
      skills: [],
      level: initLevel,
      workingType: initWorkingType
    }
  });

  const { data: checkSavedJobsData } =
    useCheckSavedJobsQuery(
      {
        jobIds: jobs.map((job) => job.jobId)
      },
      {
        skip: !jobs || jobs.length === 0 || !user || !isSignedIn
      }
    );

  const savedJobs = useMemo(() => checkSavedJobsData?.data || [], [checkSavedJobsData]);

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-primary/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6">
          <JobFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
            skills={skillsData}
            isFetchingSkills={isFetchingSkills}
            skillInputValue={skillInputValue}
            onSkillInputChange={handleSkillInputChange}
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
                    {jobs.length}
                  </span>{" "}
                  trong{" "}
                  <span className="font-semibold text-foreground">
                    {totalItems}
                  </span>{" "}
                  công việc
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
                    Không thể tải danh sách công việc. Vui lòng thử lại sau.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}

            {!isLoading && !isError && jobs.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Không tìm thấy việc làm</EmptyTitle>
                  <EmptyDescription>
                    Không tìm thấy việc làm nào khớp với yêu cầu của bạn
                  </EmptyDescription>
                </EmptyHeader>
                {activeFiltersCount > 0 && (
                  <Button onClick={resetFilters} className={"rounded-xl"}>Xóa bộ lọc</Button>
                )}
              </Empty>
            )}

            {!isLoading && !isError && jobs.length > 0 && (
              <JobList
                jobs={jobs}
                savedJobs={savedJobs}
                viewMode={viewMode}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
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
