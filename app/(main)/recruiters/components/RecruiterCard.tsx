"use client";

import RecruiterGridCard from "@/app/(main)/recruiters/components/RecruiterGridCard";
import RecruiterListCard from "@/app/(main)/recruiters/components/RecruiterListCard";
import { Recruiter } from "@/types/model";

interface RecruiterCardProps {
  recruiter: Recruiter;
  viewMode: "list" | "grid";
}

export default function RecruiterCard({
  recruiter,
  viewMode,
}: RecruiterCardProps) {
  if (viewMode === "grid") {
    return <RecruiterGridCard recruiter={recruiter} />;
  }

  // List view
  return <RecruiterListCard recruiter={recruiter} />;
}
