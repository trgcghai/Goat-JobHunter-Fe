import { JobCard } from "@/app/(main)/jobs/components";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/model";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";

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

      {jobs.length === 0 &&
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Không tìm thấy việc làm nào</EmptyTitle>
            <EmptyDescription>Vui lòng tìm kiếm các việc làm khác hoặc thử lại sau.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      }

      <div className="flex flex-col gap-2">
        {jobs && jobs.map((relatedJob) => (
          <JobCard key={relatedJob.jobId} job={relatedJob} viewMode="list" />
        ))}
      </div>
    </Card>
  );
}

export default RelatedJobs;
