"use client";

import {
  ProfileTabContents,
  ProfileTabsList,
} from "@/app/(main)/profile/components";
import { Tabs } from "@/components/ui/tabs";
import { User } from "@/types/model";
import { useState } from "react";

interface ProfileTabsProps {
  user: User;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ProfileTabsList />
        <ProfileTabContents user={user} />
      </Tabs>
    </div>
  );
}
