import { Job, Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { Briefcase, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface RecruiterHeaderProps {
  recruiter: Recruiter;
  recruiterJobs: Job[];
}

export default function RecruiterHeader({
  recruiter,
  recruiterJobs,
}: RecruiterHeaderProps) {
  const [imageError, setImageError] = useState(false);

  const name = useMemo(() => recruiter.fullName || "N/A", [recruiter.fullName]);
  const hasAvatar = useMemo(
    () => recruiter.avatar && !imageError,
    [recruiter.avatar, imageError],
  );
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
    <div className="flex items-start gap-6">
      <div className="h-24 w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
        {hasAvatar ? (
          <Image
            src={recruiter.avatar!}
            alt={String(name)}
            className="w-full h-full object-cover"
            width={96}
            height={96}
            onError={() => setImageError(true)}
          />
        ) : (
          <User className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
        <div className="gap-4 text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{address ? capitalizeText(address) : "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="truncate">{email || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="truncate">{phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>
              <span className="font-semibold text-primary">
                {recruiterJobs.length}
              </span>{" "}
              công việc đang tuyển
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
