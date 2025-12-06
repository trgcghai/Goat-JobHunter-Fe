import { JobCard } from "@/app/(main)/jobs/components";
import { Job } from "@/types/model";
import CustomPagination from "@/components/common/CustomPagination";
import { Card } from "@/components/ui/card";

interface RecruiterJobsProps {
  recruiterJobs: Job[];
  savedJobs: {
    jobId: number;
    result: boolean;
  }[];
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  },
  page: number;
  setPage: (page: number) => void;
}

export default function RecruiterJobs({ recruiterJobs, savedJobs, meta, setPage, page }: RecruiterJobsProps) {
  return (
    <Card className="mt-12 p-6">
      <h3 className="text-xl font-bold text-foreground">
        Việc Làm Đang Tuyển ({meta.total})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recruiterJobs.map((job) => (
          <JobCard
            key={job.jobId}
            job={job}
            viewMode="grid"
            isSaved={savedJobs.find(j => j.jobId === job.jobId)?.result || false}
          />
        ))}
      </div>
      <div className={"mt-4"}>
        <CustomPagination
          currentPage={page}
          totalPages={meta.pages}
          onPageChange={setPage}
          onNextPage={() => setPage(page + 1)}
          onPreviousPage={() => setPage(page - 1)}
          hasNextPage={page < meta.pages}
          hasPreviousPage={page > 1}
        />
      </div>
    </Card>
  );
}
