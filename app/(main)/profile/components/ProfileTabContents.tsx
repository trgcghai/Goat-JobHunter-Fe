import {
  ProfileApplication,
  ProfileEmailNotification,
  ProfileInfo,
  ProfileNotifications,
  ProfilePassword,
} from "@/app/(main)/profile/components";
import { TabsContent } from "@/components/ui/tabs";

const ProfileTabContents = () => {
  return (
    <>
      <TabsContent value="applications" className="space-y-4">
        <ProfileApplication />
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
        <ProfileInfo />
      </TabsContent>
    </>
  );
};

export default ProfileTabContents;
