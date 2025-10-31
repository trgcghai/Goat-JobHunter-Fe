import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  viewMode: "list" | "grid";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function JobList({ jobs, viewMode }: JobListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.jobId}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="mb-2">
                  {job.level}
                </Badge>
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
                  <Briefcase className="h-4 w-4" />
                  <span>{job.workingType}</span>
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
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card
          key={job.jobId}
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0"
        >
          <div className="flex gap-6 p-6">
            <div className="flex-1">
              <CardHeader className="p-0 mb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{job.level}</Badge>
                      <Badge variant={job.active ? "default" : "outline"}>
                        {job.active ? "Đang tuyển" : "Đã đóng"}
                      </Badge>
                      <Badge variant="outline">{job.workingType}</Badge>
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
      ))}
    </div>
  );
}
