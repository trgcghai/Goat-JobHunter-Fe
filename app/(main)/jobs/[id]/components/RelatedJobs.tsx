import { JobCard } from "@/app/(main)/jobs/components";
import ErrorMessage from "@/components/ErrorMessage";
import LoaderSpin from "@/components/LoaderSpin";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/model";

interface RelatedJobsProps {
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
}

function RelatedJobs({ jobs, isLoading, isError }: RelatedJobsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground">Việc Làm Liên Quan</h3>

      {isLoading && <LoaderSpin />}

      {isError && (
        <ErrorMessage message="Không thể tải các công việc liên quan." />
      )}

      <div className="flex flex-col gap-2">
        {jobs.map((relatedJob) => (
          <JobCard key={relatedJob.jobId} job={relatedJob} viewMode="list" />
        ))}
      </div>
    </Card>
  );
}
export default RelatedJobs;
