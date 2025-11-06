"use client";

import { JobFilter, JobList } from "@/app/(main)/jobs/components";
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
import { allJobs } from "@/constants/sample";
import { Grid3x3, List } from "lucide-react";
import { useMemo, useState } from "react";

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "grid" ? 9 : 10;

  const [filters, setFilters] = useState({
    location: [] as string[],
    skills: [] as string[],
    employer: [] as string[],
    level: [] as string[],
    workingType: [] as string[],
  });

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (
        filters.location &&
        !job.location
          ?.toLowerCase()
          .includes(filters.location.join(",").toLowerCase())
      ) {
        return false;
      }

      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some((skill) =>
          job.skills?.some((jobSkill) =>
            jobSkill.name?.toLowerCase().includes(skill.toLowerCase()),
          ),
        );
        if (!hasSkill) return false;
      }

      if (filters.level.length > 0 && !filters.level.includes(job.level)) {
        return false;
      }

      if (
        filters.workingType.length > 0 &&
        !filters.workingType.includes(job.workingType || "")
      ) {
        return false;
      }

      return true;
    });
  }, [filters.location, filters.skills, filters.level, filters.workingType]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-primary/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6">
          <JobFilter filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Hiển thị{" "}
                <span className="font-semibold text-foreground">
                  {paginatedJobs.length}
                </span>{" "}
                trong{" "}
                <span className="font-semibold text-foreground">
                  {filteredJobs.length}
                </span>{" "}
                công việc
              </p>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setViewMode("list");
                    setCurrentPage(1);
                  }}
                  className="rounded-xl"
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
                  className="rounded-xl"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {paginatedJobs.length > 0 ? (
              <JobList
                jobs={paginatedJobs}
                viewMode={viewMode}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Không tìm thấy việc làm</EmptyTitle>
                  <EmptyDescription>
                    Không tìm thấy việc làm nào khớp với yêu cầu của bạn
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
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
        </div>
      </section>
    </main>
  );
}
