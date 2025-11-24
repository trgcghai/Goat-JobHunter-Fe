"use client";
import { ProfileHeader, ProfileTabs } from "@/app/(main)/profile/components";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useUser } from "@/hooks/useUser";
import { useGetMyAccountQuery } from "@/services/auth/authApi";

const ProfilePage = () => {
  // Fetch user data to ensure it's up-to-date when accessing the profile page, the data returned is stored in the redux store handle by rtk query automatically
  useGetMyAccountQuery();
  const { user, isSignedIn } = useUser(); // Get user data from redux store

  if (!user || !isSignedIn) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Không tìm thấy hồ sơ</EmptyTitle>
          <EmptyDescription>
            Hồ sơ bạn đang tìm kiếm không tồn tại hoặc đã xảy ra lỗi. Hãy thử
            lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="flex-1">
      <ProfileHeader />
      <ProfileTabs />
    </main>
  );
};

export default ProfilePage;
