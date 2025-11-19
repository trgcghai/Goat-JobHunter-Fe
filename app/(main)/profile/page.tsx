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

  if (!user) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Không tìm thấy hồ sơ</EmptyTitle>
          <EmptyDescription>
            Hồ sơ bạn đang tìm kiếm không tồn tại. Hãy thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (isLoading) {
    return <LoaderSpin fullScreen />;
  }

  if (isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Lỗi tải hồ sơ</EmptyTitle>
          <EmptyDescription>
            Đã xảy ra lỗi khi tải hồ sơ của bạn. Vui lòng thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="flex-1">
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
    </main>
  );
};

export default ProfilePage;
