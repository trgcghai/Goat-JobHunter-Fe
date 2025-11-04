"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  avatar?: string;
  link?: string;
}

export function NotificationPopup() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Ứng tuyển thành công",
      message:
        "Bạn đã ứng tuyển thành công vào vị trí Senior Frontend Engineer",
      createdAt: "2025-11-04T10:30:00Z",
      read: false,
      avatar: "/placeholder.svg",
      link: "/jobs/1",
    },
    {
      id: "2",
      title: "Phỏng vấn sắp tới",
      message: "Bạn có lịch phỏng vấn vào 10:00 ngày 05/11/2025",
      createdAt: "2025-11-04T09:00:00Z",
      read: false,
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Công việc phù hợp",
      message: "Có 5 công việc mới phù hợp với hồ sơ của bạn",
      createdAt: "2025-11-03T15:20:00Z",
      read: true,
      avatar: "/placeholder.svg",
      link: "/jobs",
    },
    {
      id: "4",
      title: "Nhà tuyển dụng xem hồ sơ",
      message: "TechCorp Vietnam đã xem hồ sơ của bạn",
      createdAt: "2025-11-03T14:00:00Z",
      read: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "5",
      title: "Cập nhật trạng thái",
      message: "Đơn ứng tuyển của bạn đã được chuyển sang vòng phỏng vấn",
      createdAt: "2025-11-02T16:45:00Z",
      read: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "6",
      title: "Lời mời làm việc",
      message: "StartupXYZ muốn mời bạn tham gia vị trí Product Manager",
      createdAt: "2025-11-02T11:30:00Z",
      read: true,
      avatar: "/placeholder.svg",
      link: "/jobs/2",
    },
    {
      id: "7",
      title: "Thông báo từ hệ thống",
      message:
        "Vui lòng cập nhật thông tin hồ sơ để có cơ hội việc làm tốt hơn",
      createdAt: "2025-11-01T09:00:00Z",
      read: true,
    },
    {
      id: "8",
      title: "Bình luận mới",
      message: "Có người vừa bình luận vào bài viết của bạn",
      createdAt: "2025-10-31T20:15:00Z",
      read: true,
      avatar: "/placeholder.svg",
      link: "/blogs/1",
    },
    {
      id: "9",
      title: "Đánh giá ứng viên",
      message: "Nhà tuyển dụng đã gửi đánh giá về buổi phỏng vấn của bạn",
      createdAt: "2025-10-31T14:00:00Z",
      read: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "10",
      title: "Nhắc nhở",
      message: "Bạn có 3 công việc đã lưu sắp hết hạn ứng tuyển",
      createdAt: "2025-10-30T08:00:00Z",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-semibold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 rounded-xl" align="end">
        <div className="flex items-center justify-between p-2 border-b border-border">
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

        <ScrollArea className={cn(notifications.length > 0 ? "h-80" : "h-48")}>
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-2 py-4 hover:bg-accent/50 transition-colors group ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  {notification.link ? (
                    <Link
                      href={notification.link}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <NotificationItem notification={notification} />
                    </Link>
                  ) : (
                    <div onClick={() => markAsRead(notification.id)}>
                      <NotificationItem notification={notification} />
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <Button
                        size="sm"
                        className="h-7 text-xs rounded-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          markAsRead(notification.id);
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
                        deleteNotification(notification.id);
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
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                Không có thông báo nào
              </p>
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-2 border-t border-border">
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

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className="flex gap-3 cursor-pointer">
      {notification.avatar ? (
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={notification.avatar} alt="Avatar" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p
            className={`text-sm font-semibold ${
              !notification.read ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}
