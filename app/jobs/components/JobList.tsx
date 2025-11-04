import { FilterOptions } from "@/app/jobs/components/JobFilter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Job } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface JobListProps {
  jobs: Job[];
  viewMode: "list" | "grid";
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function JobList({
  jobs,
  viewMode,
  filters,
  onFilterChange,
}: JobListProps) {
  const handleLevelClick = (level: string) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        level: filters.level === level ? "" : level,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleWorkingTypeClick = (workingType: string) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        workingType: filters.workingType === workingType ? "" : workingType,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link key={job.jobId} href={`/jobs/${job.jobId}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLevelClick(job.level);
                      }}
                    >
                      {job.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkingTypeClick(job.workingType || "");
                      }}
                    >
                      {job.workingType}
                    </Badge>
                  </div>
                  <Badge
                    variant={job.active ? "default" : "outline"}
                    className="mb-2"
                  >
                    {job.active ? "Đang tuyển" : "Đã đóng"}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-1">
                  {job.title}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold text-primary">
                      ${job.salary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {job.createdAt && <span>{formatDate(job.createdAt)}</span>}
                  </div>
                </div>

                <p className="text-sm text-foreground line-clamp-2 mb-4">
                  {job.description}
                </p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill.skillId}
                        variant="outline"
                        className="text-xs"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Link key={job.jobId} href={`/jobs/${job.jobId}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 mb-4">
            <div className="flex gap-6 p-6">
              <div className="flex-1">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLevelClick(job.level);
                          }}
                        >
                          {job.level}
                        </Badge>
                        <Badge variant={job.active ? "default" : "outline"}>
                          {job.active ? "Đang tuyển" : "Đã đóng"}
                        </Badge>
                        <Badge
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWorkingTypeClick(job.workingType || "");
                          }}
                        >
                          {job.workingType}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xl text-foreground mb-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {job.createdAt && (
                            <span>{formatDate(job.createdAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 font-semibold text-primary text-lg">
                        <DollarSign className="h-5 w-5" />
                        <span>{job.salary.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.quantity} vị trí
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 mb-4">
                  <p className="text-sm text-foreground line-clamp-2 mb-3">
                    {job.description}
                  </p>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill) => (
                        <Badge
                          key={skill.skillId}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
