"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notifications as sampleNotifications } from "@/constants/sample";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import {
  Bell,
  BellRing,
  CheckCheck,
  Heart,
  MessageCircle,
  RefreshCcwIcon,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export default function NotificationPopup() {
  const [notifications, setNotifications] =
    useState<NotificationType[]>(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.seen).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, seen: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-semibold flex items-center justify-center p-0">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 rounded-xl" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Thông báo</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary/80 rounded-xl"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Đánh dấu đã đọc
            </Button>
          )}
        </div>

        <ScrollArea
          className={cn(notifications.length > 0 ? "h-[400px]" : "h-[300px]")}
        >
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className={`px-4 py-3 hover:bg-accent/50 transition-colors group ${
                    !notification.seen ? "bg-primary/5" : ""
                  }`}
                >
                  <div onClick={() => markAsRead(notification.notificationId!)}>
                    <NotificationItem notification={notification} />
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
              ))}
            </div>
          ) : (
            <EmptyMuted />
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-border">
            <Link href="/notifications">
              <Button variant="ghost" className="w-full text-sm rounded-xl">
                Xem tất cả thông báo
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({
  notification,
}: {
  notification: NotificationType;
}) {
  // Generate notification message based on type
  const getNotificationContent = () => {
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

  const { icon, message } = getNotificationContent();

  return (
    <div className="flex gap-3 cursor-pointer">
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
  );
}

export function EmptyMuted() {
  return (
    <Empty className="h-full bg-linear-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-white">
          <BellRing />
        </EmptyMedia>
        <EmptyTitle>Không có thông báo nào</EmptyTitle>
        <EmptyDescription>
          Bạn đã xem tất cả thông báo. Các thông báo mới sẽ xuất hiện ở đây.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="default" size="sm" className="rounded-xl">
          <RefreshCcwIcon />
          Làm mới
        </Button>
      </EmptyContent>
    </Empty>
  );
}
