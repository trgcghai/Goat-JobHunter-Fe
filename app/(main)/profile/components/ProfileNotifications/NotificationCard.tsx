import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NotificationType } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { CheckCheck, Trash2 } from "lucide-react";

interface NotificationCardProps {
  notification: NotificationType;
  icon: React.ReactNode;
  message: string;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationCard = ({
  notification,
  icon,
  message,
  markAsRead,
  deleteNotification,
}: NotificationCardProps) => {
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
};

export default NotificationCard;
