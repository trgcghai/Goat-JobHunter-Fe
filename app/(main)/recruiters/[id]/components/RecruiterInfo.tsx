import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Job, Recruiter } from "@/types/model";

interface RecruiterInfoProps {
  recruiter: Recruiter;
  recruiterJobs: Job[];
}

export default function RecruiterInfo({
  recruiter,
  recruiterJobs,
}: RecruiterInfoProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground">
            Thông Tin Liên Hệ
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Địa chỉ</p>
              <p className="text-foreground font-medium">{recruiter.address}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Website</p>
              <a
                href={recruiter.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {recruiter.website || "N/A"}
              </a>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Số lượng việc làm
              </p>
              <p className="text-foreground font-medium">
                {recruiterJobs.length} công việc
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
