"use client";

import { RecruiterCard } from "@/app/(main)/recruiters/components/RecruiterCard";
import { Recruiter } from "@/types/model";

interface RecruiterListProps {
  recruiters: Recruiter[];
  viewMode: "list" | "grid";
}

export function RecruiterList({ recruiters, viewMode }: RecruiterListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recruiters.map((recruiter) => (
          <RecruiterCard
            key={recruiter.userId}
            recruiter={recruiter}
            viewMode="grid"
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
        />
      ))}
    </div>
  );
}
