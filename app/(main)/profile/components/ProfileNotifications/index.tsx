"use client";

import NotificationCard from "@/app/(main)/components/NotificationCard";
import CustomPagination from "@/components/CustomPagination";
import ErrorMessage from "@/components/ErrorMessage";
import LoaderSpin from "@/components/LoaderSpin";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useGetUsersNotificationsQuery } from "@/services/user/userApi";
import { useMemo, useState } from "react";

export default function ProfileNotifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetUsersNotificationsQuery({
    page: currentPage,
  });

  const notifications = useMemo(() => data?.data?.result || [], [data]);
  const meta = useMemo(() => data?.data?.meta, [data]);

  const totalPages = useMemo(() => meta?.pages || 0, [meta]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const markAsRead = (id: string) => {
    console.log("mark as read for id ", id);
  };

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (notifications.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>Không có thông báo nào</EmptyTitle>
          <EmptyDescription>Hãy kiểm tra lại sau</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Đã có lỗi xảy ra khi tải các thông báo. Vui lòng thử lại sau"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {notifications.map((notification) => {
          return (
            <NotificationCard
              key={notification.notificationId}
              notification={notification}
              markAsRead={markAsRead}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            hasNextPage={currentPage < totalPages}
            hasPreviousPage={currentPage > 1}
            visiblePageRange={2}
          />
        </div>
      )}
    </div>
  );
}
