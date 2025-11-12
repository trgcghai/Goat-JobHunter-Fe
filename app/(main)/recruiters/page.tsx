"use client";

import {
  RecruiterFilter,
  RecruiterList,
} from "@/app/(main)/recruiters/components";
import useRecruitersFilter from "@/app/(main)/recruiters/hooks/useRecruitersFilter";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
      keyword: "",
      address: [],
    },
  });

  // Generate page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pageNumbers.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1),
  );

  console.log(recruiters);

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

            {totalPages > 1 && !isLoading && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={previousPage}
                        className={`rounded-xl cursor-pointer ${
                          !hasPreviousPage && "pointer-events-none opacity-50"
                        }`}
                      />
                    </PaginationItem>

                    {currentPage > 2 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => goToPage(1)}
                            className="rounded-xl cursor-pointer"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {visiblePages.map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => goToPage(page)}
                          isActive={page === currentPage}
                          className="rounded-xl cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => goToPage(totalPages)}
                            className="rounded-xl cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={nextPage}
                        className={`rounded-xl cursor-pointer ${
                          !hasNextPage && "pointer-events-none opacity-50"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
