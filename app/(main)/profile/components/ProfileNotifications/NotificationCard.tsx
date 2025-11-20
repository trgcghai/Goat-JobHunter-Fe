import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { Bell, CheckCheck, Heart, MessageCircle } from "lucide-react";
import { useCallback } from "react";

interface NotificationCardProps {
  notification: NotificationType;
  markAsRead: (id: string) => void;
  variant?: "default" | "compact";
}

const NotificationCard = ({
  notification,
  markAsRead,
  variant = "default",
}: NotificationCardProps) => {
  const getNotificationContent = useCallback(
    (notification: NotificationType) => {
      const actorName = notification.actor?.userId || "Người dùng";

      switch (notification.type) {
        case "LIKE":
          return {
            icon: <Heart className="h-5 w-5 text-red-500" />,
            message: `${actorName} đã thích bài viết của bạn`,
          };
        case "COMMENT":
          return {
            icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
            message: `${actorName} đã bình luận về bài viết của bạn`,
          };
        case "REPLY":
          return {
            icon: <MessageCircle className="h-5 w-5 text-green-500" />,
            message: `${actorName} đã trả lời bình luận của bạn`,
          };
        default:
          return {
            icon: <Bell className="h-5 w-5 text-primary" />,
            message: "Bạn có thông báo mới",
          };
      }
    },
    [],
  );

  const { icon, message } = getNotificationContent(notification);

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "px-4 py-3 hover:bg-accent/50 transition-colors group cursor-pointer",
          !notification.seen && "bg-primary/5",
        )}
        onClick={() => markAsRead(notification.notificationId!)}
      >
        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p
                className={cn(
                  "text-sm",
                  !notification.seen
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground",
                )}
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
        !notification.seen && "bg-primary/5 border-primary/30",
      )}
      onClick={() => markAsRead(notification.notificationId!)}
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p
              className={cn(
                "text-sm",
                !notification.seen
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground",
              )}
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
      </div>
    </Card>
  );
};

export default NotificationCard;
