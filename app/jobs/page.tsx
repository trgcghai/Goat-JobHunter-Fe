"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import { JobList } from "@/app/jobs/components/JobList";
import { JobFilter } from "@/app/jobs/components/JobFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Vietnam",
    location: "Ho Chi Minh City",
    salary: "$2,000 - $3,500",
    type: "Full-time",
    description:
      "Looking for an experienced frontend engineer to join our growing team.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    datePosted: "2025-01-15",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Hanoi",
    salary: "$1,800 - $2,800",
    type: "Full-time",
    description: "Join our product team and shape the future of our platform.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Product Strategy", "Analytics", "Leadership"],
    datePosted: "2025-01-14",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Da Nang",
    salary: "$1,500 - $2,500",
    type: "Full-time",
    description:
      "Create beautiful and intuitive user experiences for our clients.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Figma", "UI Design", "Prototyping"],
    datePosted: "2025-01-13",
  },
  {
    id: 4,
    title: "Backend Engineer (Node.js)",
    company: "CloudServices Inc",
    location: "Ho Chi Minh City",
    salary: "$2,200 - $3,800",
    type: "Full-time",
    description: "Build scalable backend systems with Node.js and AWS.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Node.js", "AWS", "PostgreSQL"],
    datePosted: "2025-01-12",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "DataCorp",
    location: "Hanoi",
    salary: "$1,600 - $2,400",
    type: "Full-time",
    description: "Analyze and visualize data to drive business insights.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Python", "SQL", "Tableau"],
    datePosted: "2025-01-10",
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppStudio",
    location: "Da Nang",
    salary: "$1,700 - $2,600",
    type: "Full-time",
    description:
      "Develop iOS and Android applications for mobile-first experiences.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Flutter", "React Native", "Mobile UI"],
    datePosted: "2025-01-08",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "InfraTech",
    location: "Ho Chi Minh City",
    salary: "$2,100 - $3,200",
    type: "Full-time",
    description: "Manage and optimize cloud infrastructure and deployments.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Kubernetes", "Docker", "AWS"],
    datePosted: "2025-01-05",
  },
  {
    id: 8,
    title: "QA Engineer",
    company: "TechCorp Vietnam",
    location: "Hanoi",
    salary: "$1,300 - $2,000",
    type: "Full-time",
    description:
      "Ensure product quality through comprehensive testing strategies.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    skills: ["Automation Testing", "Selenium", "Manual Testing"],
    datePosted: "2025-01-03",
  },
];

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "grid" ? 6 : 10;

  const [filters, setFilters] = useState({
    location: "",
    skills: [] as string[],
    employer: "",
    datePosted: "all",
  });

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some((skill) =>
          job.skills.some((jobSkill) =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasSkill) return false;
      }

      if (
        filters.employer &&
        !job.company.toLowerCase().includes(filters.employer.toLowerCase())
      ) {
        return false;
      }

      if (filters.datePosted !== "all") {
        const jobDate = new Date(job.datePosted);
        const today = new Date();
        const daysAgo = Number.parseInt(filters.datePosted);

        const cutoffDate = new Date(today);
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

        if (jobDate < cutoffDate) return false;
      }

      return true;
    });
  }, [filters.datePosted, filters.employer, filters.location, filters.skills]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              <JobList jobs={paginatedJobs} viewMode={viewMode} />
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground mb-2">
                  Không tìm thấy công việc nào
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
        </div>
      </section>
    </main>
  );
}
