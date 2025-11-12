import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { useMemo } from "react";

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

export default function RecruiterInfo({ recruiter }: RecruiterInfoProps) {
  const address = useMemo(() => recruiter.address || "", [recruiter.address]);

  const email = useMemo(
    () => recruiter.contact?.email || recruiter.email || "",
    [recruiter.contact?.email, recruiter.email],
  );

  const phone = useMemo(
    () => recruiter.contact?.phone || "",
    [recruiter.contact?.phone],
  );

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="p-6">
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
              <p className="text-foreground font-medium">{email || "N/A"}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Số điện thoại
              </p>
              <p className="text-foreground font-medium">{phone || "N/A"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
