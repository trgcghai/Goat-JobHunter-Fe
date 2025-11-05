import { Job, Recruiter } from "@/types/model";
import { Briefcase, Globe, MapPin } from "lucide-react";
import Image from "next/image";

interface RecruiterHeaderProps {
  recruiter: Recruiter;
  recruiterJobs: Job[];
}

export default function RecruiterHeader({
  recruiter,
  recruiterJobs,
}: RecruiterHeaderProps) {
  return (
    <div className="flex items-start gap-6">
      <div className="h-24 w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
        <Image
          src={recruiter.avatar || "/placeholder.svg"}
          alt={recruiter.fullName}
          className="w-full h-full object-cover"
          width={96}
          height={96}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {recruiter.fullName}
        </h1>
        <div className="gap-4 text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{recruiter.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <a
              href={recruiter.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {recruiter.website || "N/A"}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="">
              <span className="font-semibold text-primary">
                {recruiterJobs.length}{" "}
              </span>
              công việc đang tuyển
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
