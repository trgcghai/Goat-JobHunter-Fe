"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { notifications as sampleNotifications } from "@/constants/sample";
import { NotificationType } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import {
  Bell,
  CheckCheck,
  Heart,
  MessageCircle,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export function ProfileNotifications() {
  const [notifications, setNotifications] =
    useState<NotificationType[]>(sampleNotifications);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNotifications = notifications.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, seen: true } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
  };

  const getNotificationContent = (notification: NotificationType) => {
    const actorName = notification.actor?.userId || "Người dùng";

    switch (notification.type) {
      case "like":
        return {
          icon: <Heart className="h-5 w-5 text-red-500" />,
          message: `${actorName} đã thích bài viết của bạn`,
        };
      case "comment":
        return {
          icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
          message: `${actorName} đã bình luận về bài viết của bạn`,
        };
      case "reply":
        return {
          icon: <MessageCircle className="h-5 w-5 text-green-500" />,
          message: `${actorName} đã trả lời bình luận của bạn`,
        };
      case "follow":
        return {
          icon: <UserPlus className="h-5 w-5 text-primary" />,
          message: `${actorName} đã theo dõi bạn`,
        };
      default:
        return {
          icon: <Bell className="h-5 w-5 text-primary" />,
          message: "Bạn có thông báo mới",
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {currentNotifications.map((notification) => {
          const { icon, message } = getNotificationContent(notification);

          return (
            <Card
              key={notification.notificationId}
              className={`p-4 cursor-pointer hover:shadow-md transition-shadow group ${
                !notification.seen ? "bg-primary/5 border-primary/30" : ""
              }`}
              onClick={() => markAsRead(notification.notificationId!)}
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p
                        className={`text-sm ${
                          !notification.seen
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message}
                      </p>
                      {!notification.seen && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(notification.createdAt || "")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.seen && (
                    <Button
                      size="sm"
                      className="h-7 text-xs rounded-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        markAsRead(notification.notificationId!);
                      }}
                    >
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Đã đọc
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 text-xs rounded-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteNotification(notification.notificationId!);
                    }}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1,
                )
                .map((page, index, array) => (
                  <>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        className="rounded-xl"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
