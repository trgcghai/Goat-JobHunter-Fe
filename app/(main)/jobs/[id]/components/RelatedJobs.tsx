import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { allJobs } from "@/constants/sample";
import Link from "next/link";

function RelatedJobs({ currentJob }: { currentJob: Job }) {
  const relatedJobs = allJobs
    .filter(
      (j) =>
        j.jobId !== currentJob.jobId &&
        (j.level === currentJob.level || j.location === currentJob.location) &&
        j.active,
    )
    .slice(0, 3);

  if (relatedJobs.length === 0) return null;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Việc Làm Liên Quan
      </h3>
      <div className="flex flex-col gap-4">
        {relatedJobs.map((relatedJob) => (
          <Link key={relatedJob.jobId} href={`/jobs/${relatedJob.jobId}`}>
            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="text-foreground mb-1 line-clamp-1 font-medium">
                {relatedJob.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {relatedJob.location}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {relatedJob.level}
                </Badge>
                <span className="text-sm text-primary font-semibold">
                  ${relatedJob.salary.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
export default RelatedJobs;
