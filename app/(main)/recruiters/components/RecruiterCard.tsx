"use client";

import RecruiterGridCard from "@/app/(main)/recruiters/components/RecruiterGridCard";
import RecruiterListCard from "@/app/(main)/recruiters/components/RecruiterListCard";
import useRecruiterActions from "@/hooks/useRecruiterActions";
import { useUser } from "@/hooks/useUser";
import { useCheckRecruitersFollowedQuery } from "@/services/user/userApi";
import { Recruiter } from "@/types/model";
import { useEffect, useState } from "react";

interface RecruiterCardProps {
  recruiter: Recruiter;
  viewMode: "list" | "grid";
}

export default function RecruiterCard({
  recruiter,
  viewMode,
}: RecruiterCardProps) {
  const { user, isSignedIn } = useUser();
  const { handleToggleFollowRecruiter } = useRecruiterActions();
  const { data: checkFollowedData, isSuccess: isCheckFollowedSuccess } =
    useCheckRecruitersFollowedQuery(
      {
        recruiterIds: [recruiter.userId],
      },
      {
        skip: !recruiter || !isSignedIn || !user,
      },
    );
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (isCheckFollowedSuccess && checkFollowedData) {
      const followedStatus = checkFollowedData?.data?.find(
        (item) => item.recruiterId === recruiter.userId,
      )?.result;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFollowed(!!followedStatus);
    }
  }, [isCheckFollowedSuccess, checkFollowedData, recruiter.userId]);

  const handleFollowRecruiter = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleToggleFollowRecruiter(e, recruiter, isFollowed, setIsFollowed);
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
