import ErrorMessage from "@/components/ErrorMessage";
import LoaderSpin from "@/components/LoaderSpin";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useCurrencyFormat from "@/hooks/useCurrencyFormat";
import { Job } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import Link from "next/link";

interface RelatedJobsProps {
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
}

function RelatedJobs({ jobs, isLoading, isError }: RelatedJobsProps) {
  const { format } = useCurrencyFormat();
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Việc Làm Liên Quan
      </h3>

      {isLoading && <LoaderSpin />}

      {isError && (
        <ErrorMessage message="Không thể tải các công việc liên quan." />
      )}

      <div className="flex flex-col gap-4">
        {jobs.map((relatedJob) => (
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
                  {capitalizeText(relatedJob.level)}
                </Badge>
                <span className="text-sm text-primary font-semibold">
                  {format(relatedJob.salary)}
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
