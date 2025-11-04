"use client";

import { ProfileApplications } from "@/app/(main)/profile/components/ProfileApplications";
import { ProfileEmailNotification } from "@/app/(main)/profile/components/ProfileEmailNotification";
import { ProfileInfo } from "@/app/(main)/profile/components/ProfileInfo";
import { ProfileNotifications } from "@/app/(main)/profile/components/ProfileNotifications";
import { ProfilePassword } from "@/app/(main)/profile/components/ProfilePassword";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Briefcase, Lock, Mail, UserIcon } from "lucide-react";
import { useState } from "react";

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 rounded-xl cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Thông Báo</span>
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 rounded-xl cursor-pointer"
          >
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Mật Khẩu</span>
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="flex items-center gap-2 rounded-xl cursor-pointer"
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Ứng Tuyển</span>
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="flex items-center gap-2 rounded-xl cursor-pointer"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="flex items-center gap-2 rounded-xl cursor-pointer"
          >
            <UserIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Thông Tin</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <ProfileNotifications />
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <ProfilePassword />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <ProfileApplications />
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <ProfileEmailNotification />
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <ProfileInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
