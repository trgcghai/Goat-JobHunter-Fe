"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Applicant } from "@/types/model";
import Image from "next/image";
import { Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { capitalize } from "lodash";

interface ApplicantGridCardProps {
  applicant: Applicant;
  onContact: (e: React.MouseEvent) => void;
}

const ApplicantGridCard = ({ applicant, onContact }: ApplicantGridCardProps) => {
  const [imageError, setImageError] = useState(false);
  const hasAvatar = !!(applicant.avatar && !imageError);

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow py-4">
        <CardHeader className="px-6 pt-2">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
              {hasAvatar ? (
                <Image
                  src={applicant.avatar as string}
                  alt={applicant.fullName || "Applicant"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground line-clamp-2">
                {applicant.fullName || "No name"}
              </h3>

              <div className="mt-1 text-sm text-muted-foreground flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="wrap-break-word">{applicant.contact.email || "Chưa cung cấp"}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="wrap-break-word">{applicant.contact.phone || "Chưa cung cấp"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-6 pb-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Địa chỉ: </span>
            <span className="wrap-break-word">{applicant.address || "Chưa cung cấp"}</span>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Trình độ: </span>
            <span className="wrap-break-word">{applicant.level ? capitalize(applicant.level) : "Chưa cung cấp"}</span>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Học vấn: </span>
            <span className="wrap-break-word">{applicant.education ? capitalize(applicant.education) : "Chưa cung cấp"}</span>
          </div>
        </CardContent>

        <div className="px-6 pb-2">
          <Button
            variant={"default"}
            size="sm"
            className="w-full rounded-xl"
            onClick={onContact}
          >
            <Mail className={`h-4 w-4 mr-2`} />
            Liên hệ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ApplicantGridCard;