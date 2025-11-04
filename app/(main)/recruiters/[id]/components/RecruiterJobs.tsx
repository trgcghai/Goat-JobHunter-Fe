import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allJobs } from "@/constants/sample";
import { Briefcase, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface RecruiterJobsProps {
  recruiter: Recruiter;
}

export function RecruiterJobs({ recruiter }: RecruiterJobsProps) {
  // Get jobs from this recruiter
  const recruiterJobs = allJobs.filter(
    (job) => job.recruiter?.userId === recruiter.userId,
  );

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Công Việc Đang Tuyển</span>
          <Badge variant="secondary">{recruiterJobs.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recruiterJobs.length > 0 ? (
          <div className="space-y-4">
            {recruiterJobs.map((job) => (
              <Link
                key={job.jobId}
                href={`/jobs/${job.jobId}`}
                className="block p-4 rounded-lg border border-border hover:border-primary transition-colors bg-card hover:shadow-md"
              >
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                  {job.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>{job.salary.toLocaleString()} VND</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-3 w-3 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {job.level}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Không có công việc đang tuyển
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
