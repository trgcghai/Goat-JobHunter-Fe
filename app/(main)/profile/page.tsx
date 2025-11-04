import { ProfileHeader } from "@/app/(main)/profile/components/ProfileHeader";
import { ProfileTabs } from "@/app/(main)/profile/components/ProfileTabs";

const ProfilePage = () => {
  const mockUser = {
    name: "Nguyễn Văn A",
    email: "nguyena@example.com",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  };

  return (
    <main className="flex-1">
      <ProfileHeader user={mockUser} />
      <ProfileTabs />
    </main>
  );
};

export default ProfilePage;
