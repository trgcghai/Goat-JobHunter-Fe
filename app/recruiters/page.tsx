"use client";

import { Button } from "@/components/ui/button";
import { allRecruiter } from "@/constants/sample";
import { Grid3x3, List } from "lucide-react";
import { useMemo, useState } from "react";

import { RecruiterFilter } from "@/app/recruiters/components/RecruiterFilter";
import { RecruiterList } from "@/app/recruiters/components/RecruiterList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function EmployersPage() {
  // State for filters and display
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "grid" ? 6 : 8;

  // Filter state
  const [filters, setFilters] = useState({
    location: "",
    companyName: "",
  });

  // Filter employers based on filters
  const filteredRecruiters = useMemo(() => {
    return allRecruiter.filter((recruiter) => {
      // Location filter (check in address field)
      if (
        filters.location &&
        !recruiter.address
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Company name filter
      if (
        filters.companyName &&
        !recruiter.name
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
  const paginatedRecruiters = filteredRecruiters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-primary/5 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Nhà Tuyển Dụng
          </h1>
          <p className="text-muted-foreground">
            Khám phá {allRecruiter.length} công ty hàng đầu
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <RecruiterFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Hiển thị{" "}
              <span className="font-semibold text-foreground">
                {paginatedRecruiters.length}
              </span>{" "}
              trong{" "}
              <span className="font-semibold text-foreground">
                {filteredRecruiters.length}
              </span>{" "}
              công ty
            </p>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setViewMode("list");
                  setCurrentPage(1);
                }}
                className={
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setViewMode("grid");
                  setCurrentPage(1);
                }}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {paginatedRecruiters.length > 0 ? (
            <RecruiterList
              recruiters={paginatedRecruiters}
              viewMode={viewMode}
            />
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground mb-2">
                Không tìm thấy công ty nào
              </p>
              <p className="text-sm text-muted-foreground">
                Thử thay đổi các bộ lọc của bạn
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="rounded-xl" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="rounded-xl">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="rounded-xl" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
