import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Job, Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { useMemo } from "react";

interface RecruiterInfoProps {
  recruiter: Recruiter;
  recruiterJobs: Job[];
}

export default function RecruiterInfo({
  recruiter,
  recruiterJobs,
}: RecruiterInfoProps) {
  const address = useMemo(() => recruiter.address || "", [recruiter.address]);
  const email = useMemo(
    () => recruiter.contact?.email || "",
    [recruiter.contact?.email],
  );
  const phone = useMemo(
    () => recruiter.contact?.phone || "",
    [recruiter.contact?.phone],
  );

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="p-6 h-full">
          <h2 className="text-xl font-bold text-foreground">
            Thông Tin Liên Hệ
          </h2>
          <div className="space-y-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Địa chỉ</p>
              <p className="text-foreground font-medium">
                {address ? capitalizeText(address) : "N/A"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground font-medium wrap-break-word">
                {email || "N/A"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Số điện thoại
              </p>
              <p className="text-foreground font-medium">{phone || "N/A"}</p>
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
