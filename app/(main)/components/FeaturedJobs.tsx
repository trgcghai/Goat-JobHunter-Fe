import { JobCard } from "@/app/(main)/jobs/components";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Job } from "@/types/model";
import { ArrowRight, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

interface FeaturedJobsProps {
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
  savedJobs: {
    jobId: number;
    result: boolean;
  }[];
}

export default function FeaturedJobs({ jobs, isLoading, savedJobs }: FeaturedJobsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Công Việc Nổi Bật
          </h2>
          <p className="text-muted-foreground">
            Những cơ hội việc làm mới nhất từ các công ty hàng đầu
          </p>
        </div>

        {isLoading && <LoaderSpin />}

        {jobs.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Không Có Việc Làm Nổi Bật</EmptyTitle>
              <EmptyDescription>
                Không có việc làm nổi bật nào vào lúc này. Vui lòng thử lại sau.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" className="rounded-xl" size="sm">
                <RefreshCcwIcon />
                Tải lại
              </Button>
            </EmptyContent>
          </Empty>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 &&
            jobs.map((job) => (
              <JobCard
                key={job.jobId}
                job={job}
                viewMode="grid"
                isSaved={savedJobs.find(j => j.jobId === job.jobId)?.result || false}
              />
            ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/jobs">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
            >
              Khám phá thêm các việc làm khác
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
