"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types/model";
import { formatDateTime } from "@/utils/formatDate";
import { Bell, CheckCheck, Heart, MessageCircle } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { truncate } from "lodash";
import Image from "next/image";

interface NotificationCardProps {
  notification: NotificationType;
  markAsRead: (id: number) => void;
  variant?: "default" | "compact";
}

const NotificationCard = ({
  notification,
  markAsRead,
  variant = "default"
}: NotificationCardProps) => {

  const sender = useMemo(() => notification.actor.fullName || notification.actor.username || "Người dùng ẩn danh", [notification.actor]);
  const blog = useMemo(() => notification.blog.title || " của bạn", [notification.blog]);
  const content = useMemo(() => notification?.repliedOnComment?.comment || notification?.comment?.comment, [notification]);

  const getNotificationContent = useCallback(
    (notification: NotificationType) => {
      switch (notification.type) {
        case "LIKE":
          return {
            icon: <Heart className="h-5 w-5 text-red-500" />,
            message: `${sender} đã thích bài viết của bạn: ${truncate(blog, { length: variant === "compact" ? 30 : 80 })}`
          };
        case "COMMENT":
          return {
            icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
            message: `${sender} đã bình luận về bài viết của bạn: ${truncate(content, { length: variant === "compact" ? 30 : 80 })}`
          };
        case "REPLY":
          return {
            icon: <MessageCircle className="h-5 w-5 text-green-500" />,
            message: `${sender} đã trả lời bình luận của bạn về bài viết ${blog}: ${truncate(content, { length: variant === "compact" ? 30 : 80 })}`
          };
        default:
          return {
            icon: <Bell className="h-5 w-5 text-primary" />,
            message: "Bạn có thông báo mới"
          };
      }
    },
    [blog, content, sender, variant]
  );

  const { icon, message } = getNotificationContent(notification);

  const [imageError, setImageError] = useState(false);

  const hasAvatar = notification.actor.avatar && !imageError;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "px-4 py-3 hover:bg-accent/50 transition-colors group cursor-pointer",
          !notification.seen && "bg-primary/5"
        )}
        onClick={() => markAsRead(notification.notificationId!)}
      >
        <div className="flex gap-3">
          {hasAvatar ? (
            <div className="relative h-[72px] w-[72px]">
              <div className="h-16 w-16 rounded-full bg-muted overflow-hidden flex items-center justify-center">
                <Image
                  src={notification.actor.avatar}
                  alt={sender}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
              <div className={"absolute bottom-0 right-0 p-1 rounded-full bg-background border"}>
                {icon}
              </div>
            </div>
          ) : (
            <div className="h-16 w-16 mr-2 rounded-full bg-muted flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p
                className={cn(
                  "text-sm",
                  !notification.seen
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {message}
              </p>
              {!notification.seen && (
                <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(notification.createdAt)}
            </p>
          </div>
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
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-md transition-shadow group",
        !notification.seen && "bg-primary/5 border-primary/30"
      )}
      onClick={() => markAsRead(notification.notificationId!)}
    >
      <div className="flex items-start gap-4">
        {hasAvatar ? (
          <div className="relative h-[72px] w-[72px]">
            <div className="h-16 w-16 rounded-full bg-muted overflow-hidden flex items-center justify-center">
              <Image
                src={notification.actor.avatar}
                alt={sender}
                width={64}
                height={64}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            <div className={"absolute bottom-0 right-0 p-1 rounded-full bg-background border"}>
              {icon}
            </div>
          </div>
        ) : (
          <div className="h-16 w-16 mr-2 rounded-full bg-muted flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p
              className={cn(
                "text-sm",
                !notification.seen
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {message}
            </p>
            {!notification.seen && (
              <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(notification.createdAt)}
          </p>
        </div>
      </div>
      {!notification.seen &&
        <div className="flex items-center justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>}
    </Card>
  );
};

export default NotificationCard;
