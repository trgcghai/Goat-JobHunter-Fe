"use client";

import RecruiterGridCard from "@/app/(main)/recruiters/components/RecruiterGridCard";
import RecruiterListCard from "@/app/(main)/recruiters/components/RecruiterListCard";
import useRecruiterActions from "@/hooks/useRecruiterActions";
import { Recruiter } from "@/types/model";

interface RecruiterCardProps {
  recruiter: Recruiter;
  viewMode: "list" | "grid";
  isFollowed: boolean;
}

export default function RecruiterCard({
  recruiter,
  viewMode,
  isFollowed
}: RecruiterCardProps) {

  const { handleToggleFollowRecruiter } = useRecruiterActions();

  const handleFollowRecruiter = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleToggleFollowRecruiter(e, recruiter, isFollowed);
  };

  if (viewMode === "grid") {
    return (
      <RecruiterGridCard
        recruiter={recruiter}
        isFollowed={isFollowed}
        handleFollowRecruiter={handleFollowRecruiter}
      />
    );
  }

  // List view
  return (
    <RecruiterListCard
      recruiter={recruiter}
      isFollowed={isFollowed}
      handleFollowRecruiter={handleFollowRecruiter}
    />
  );
}
