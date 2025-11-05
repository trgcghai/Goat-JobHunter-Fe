import { JobCard } from "@/app/(main)/jobs/components";
import { Job } from "@/types/model";

interface RecruiterJobsProps {
  recruiterJobs: Job[];
}

export default function RecruiterJobs({ recruiterJobs }: RecruiterJobsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Việc Làm Đang Tuyển ({recruiterJobs.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recruiterJobs.map((job) => (
          <JobCard key={job.jobId} job={job} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
