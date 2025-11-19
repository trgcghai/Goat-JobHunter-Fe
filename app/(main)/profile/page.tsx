"use client";
import { ProfileHeader, ProfileTabs } from "@/app/(main)/profile/components";
import LoaderSpin from "@/components/LoaderSpin";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useGetMyAccountQuery } from "@/services/auth/authApi";
import { useMemo } from "react";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMyAccountQuery();

  const user = useMemo(() => data?.data?.user, [data]);

  if (!user || isError) {
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

  if (isLoading) {
    return <LoaderSpin fullScreen />;
  }

  return (
    <main className="flex-1">
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
    </main>
  );
};

export default ProfilePage;
