import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Job, Recruiter } from "@/types/model";
import { capitalize } from "lodash";
import { useMemo } from "react";
import { Briefcase, Mail, MapPin, PhoneCall } from "lucide-react";

interface RecruiterInfoProps {
  recruiter: Recruiter;
  recruiterJobs: Job[];
}

export default function RecruiterInfo({
  recruiter,
  recruiterJobs
}: RecruiterInfoProps) {
  const address = useMemo(() => recruiter.address || "", [recruiter.address]);
  const email = useMemo(
    () => recruiter.contact?.email || "",
    [recruiter.contact?.email]
  );
  const phone = useMemo(
    () => recruiter.contact?.phone || "",
    [recruiter.contact?.phone]
  );

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="p-6 h-full">
          <h2 className="text-xl font-bold text-foreground">
            Thông Tin Liên Hệ
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center">
                <MapPin className={"w-4 h-4 mr-2"} />
                Địa chỉ
              </p>
              <p className="text-foreground font-medium">
                {address ? capitalize(address) : "Chưa cung cấp"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center">
                <Mail className={"w-4 h-4 mr-2"} />
                Email
              </p>
              <p className="text-foreground font-medium wrap-break-word">
                {email || "Chưa cung cấp"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center">
                <PhoneCall className={"w-4 h-4 mr-2"} />
                Số điện thoại
              </p>
              <p className="text-foreground font-medium">{phone || "Chưa cung cấp"}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center">
                <Briefcase className={"w-4 h-4 mr-2"} />
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
  )
    ;
}
