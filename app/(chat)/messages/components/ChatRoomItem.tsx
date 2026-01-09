import { ChatRoom } from "@/types/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { ChatRoomType } from "@/types/enum";
import { formatLastMessageTime } from "@/utils/formatDate";

interface ConversationItemProps {
  chatRoom: ChatRoom;
  active: boolean;
  onClick: () => void;
}

export function ChatRoomItem({ chatRoom, active, onClick }: ConversationItemProps) {
  const isGroup = chatRoom.type === ChatRoomType.GROUP;
  const displayName = chatRoom.name || "Unnamed Chat";
  const avatarFallback = displayName.charAt(0).toUpperCase();
  const formattedTime = formatLastMessageTime(chatRoom.lastMessageTime);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-accent"
          : "hover:bg-accent/50"
      }`}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={chatRoom.avatar || undefined} alt={displayName} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        {isGroup && (
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
            <Users className="h-3 w-3 text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-medium truncate">{displayName}</span>
          {formattedTime && (
            <span className="text-xs text-muted-foreground shrink-0">
              {formattedTime}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {chatRoom.lastMessagePreview || "No messages yet"}
        </p>
      </div>
    </div>
  );
}