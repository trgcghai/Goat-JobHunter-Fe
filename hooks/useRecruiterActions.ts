import {
  useFollowRecruitersMutation,
  useUnfollowRecruitersMutation,
} from "@/services/user/userApi";
import { useCallback } from "react";
import { toast } from "sonner";

const useRecruiterActions = () => {
  const [followRecruiters, { isLoading: isFollowing }] =
    useFollowRecruitersMutation();
  const [unfollowRecruiters, { isLoading: isUnfollowing }] =
    useUnfollowRecruitersMutation();

  // Follow multiple recruiters
  const handleFollowRecruiters = useCallback(
    async (recruiterIds: number[]) => {
      try {
        await followRecruiters({ recruiterIds }).unwrap();

        toast.success("Theo dõi thành công!");
      } catch (error) {
        console.error("Failed to follow recruiters:", error);
        toast.error("Không thể theo dõi nhà tuyển dụng. Vui lòng thử lại sau");
        throw error;
      }
    },
    [followRecruiters],
  );

  // Unfollow multiple recruiters
  const handleUnfollowRecruiters = useCallback(
    async (recruiterIds: number[]) => {
      try {
        await unfollowRecruiters({ recruiterIds }).unwrap();

        toast.success("Hủy theo dõi thành công!");
      } catch (error) {
        console.error("Failed to unfollow recruiters:", error);
        toast.error(
          "Không thể hủy theo dõi nhà tuyển dụng. Vui lòng thử lại sau",
        );
        throw error;
      }
    },
    [unfollowRecruiters],
  );

  return {
    // States
    isFollowing,
    isUnfollowing,
    isLoading: isFollowing || isUnfollowing,

    // Actions
    handleFollowRecruiters,
    handleUnfollowRecruiters,
  };
};

export default useRecruiterActions;
