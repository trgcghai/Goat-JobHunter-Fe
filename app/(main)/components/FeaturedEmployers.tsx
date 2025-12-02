import { RecruiterCard } from "@/app/(main)/recruiters/components";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Recruiter } from "@/types/model";
import { ArrowRight, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

interface FeaturedEmployersProps {
  recruiters: Recruiter[];
  isLoading: boolean;
  isError: boolean;
  followedRecruiters: {
    recruiterId: number;
    result: boolean
  }[]
}

export default function FeaturedEmployers({
  recruiters,
  isLoading,
  followedRecruiters
}: FeaturedEmployersProps) {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Nhà Tuyển Dụng Nổi Bật
          </h2>
          <p className="text-muted-foreground">
            Các công ty hàng đầu đang tuyển dụng
          </p>
        </div>

        {isLoading && <LoaderSpin />}

        {recruiters.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Không Có Nhà Tuyển Dụng Nổi Bật</EmptyTitle>
              <EmptyDescription>
                Không có nhà tuyển dụng nổi bật nào vào lúc này. Vui lòng thử
                lại sau.
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
          {recruiters.map((recruiter) => (
            <RecruiterCard
              key={recruiter.userId}
              recruiter={recruiter}
              viewMode="grid"
              isFollowed={followedRecruiters.find(item => item.recruiterId === recruiter.userId)?.result || false}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/recruiters">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
            >
              Khám Phá Thêm Nhà Tuyển Dụng
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
