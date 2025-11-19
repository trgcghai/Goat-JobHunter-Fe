import {
  ProfileApplication,
  ProfileEmailNotification,
  ProfileInfo,
  ProfileNotifications,
  ProfilePassword,
} from "@/app/(main)/profile/components";
import { TabsContent } from "@/components/ui/tabs";
import { User } from "@/types/model";

interface ProfileTabContentsProps {
  user: User;
}

const ProfileTabContents = ({ user }: ProfileTabContentsProps) => {
  return (
    <>
      <TabsContent value="applications" className="space-y-4">
        <ProfileApplication applications={[]} jobs={user?.savedJobs || []} />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <ProfileNotifications />
      </TabsContent>

      <TabsContent value="password" className="space-y-4">
        <ProfilePassword />
      </TabsContent>

      <TabsContent value="email" className="space-y-4">
        <ProfileEmailNotification />
      </TabsContent>

      <TabsContent value="info" className="space-y-4">
        <ProfileInfo user={user} />
      </TabsContent>
    </>
  );
};

export default ProfileTabContents;
