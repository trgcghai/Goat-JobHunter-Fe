import React, { useMemo, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Recruiter } from "@/types/model";
import Link from "next/link";

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

const RecruiterInfo = ({ recruiter }: RecruiterInfoProps) => {
  const [imageError, setImageError] = useState(false);

  const hasAvatar = useMemo(() => recruiter.avatar && !imageError, [recruiter, imageError]);

  return (
    <Link
      href={`/recruiters/${recruiter.userId}`}
      title={"Xem thông tin nhà tuyển dụng"}
      className="flex items-center gap-3 px-6"
    >
      {hasAvatar ? (
        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
          <Image
            src={recruiter.avatar || "/placeholder.svg"}
            alt={recruiter.fullName || "Nhà tuyển dụng"}
            width={48}
            height={48}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="h-12 w-12 rounded-full bg-muted shrink-0 flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col space-y-1 min-w-0">
        <p className="text-sm font-semibold leading-none truncate">
          {recruiter.fullName}
        </p>
        <p className="text-xs leading-none text-muted-foreground truncate">
          {recruiter.contact.email}
        </p>
      </div>
    </Link>
  );
};
export default RecruiterInfo;
