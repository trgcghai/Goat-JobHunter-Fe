"use client";

import { RecruiterCard } from "@/app/(main)/recruiters/components";
import { Recruiter } from "@/types/model";

interface RecruiterListProps {
  recruiters: Recruiter[];
  followedRecruiters: {
    recruiterId: number;
    result: boolean;
  }[]
  viewMode: "list" | "grid";
}

export default function RecruiterList({
  recruiters,
  followedRecruiters,
  viewMode,
}: RecruiterListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recruiters.map((recruiter) => (
          <RecruiterCard
            key={recruiter.userId}
            recruiter={recruiter}
            viewMode="grid"
            isFollowed={followedRecruiters.find(r => r.recruiterId === recruiter.userId)?.result || false}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recruiters.map((recruiter) => (
        <RecruiterCard
          key={recruiter.userId}
          recruiter={recruiter}
          viewMode="list"
          isFollowed={followedRecruiters.find(r => r.recruiterId === recruiter.userId)?.result || false}
        />
      ))}
    </div>
  );
}
