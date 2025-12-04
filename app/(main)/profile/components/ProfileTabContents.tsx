import {
  ProfileApplication,
  ProfileEmailNotification,
  ProfileInfo,
  ProfileNotifications,
  ProfilePassword
} from "@/app/(main)/profile/components";
import { TabsContent } from "@/components/ui/tabs";
import { HasApplicant } from "@/components/common/HasRole";
import { useUser } from "@/hooks/useUser";

const ProfileTabContents = () => {
  const { user } = useUser();
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

      <HasApplicant user={user!}>
        <TabsContent value="info" className="space-y-4">
          <ProfileInfo />
        </TabsContent>
      </HasApplicant>
    </>
  );
};

export default ProfileTabContents;
