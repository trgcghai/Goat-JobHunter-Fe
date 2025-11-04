import { ProfileHeader } from "@/app/(main)/profile/components/ProfileHeader";
import { ProfileTabs } from "@/app/(main)/profile/components/ProfileTabs";
import { users } from "@/constants/sample";

const ProfilePage = () => {
  const mockUser = users[0];

  return (
    <main className="flex-1">
      <ProfileHeader user={mockUser} />
      <ProfileTabs />
    </main>
  );
};

export default ProfilePage;
