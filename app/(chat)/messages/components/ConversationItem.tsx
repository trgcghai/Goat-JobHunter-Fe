"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "../utils/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { truncate } from "lodash";
import { Dot } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, active, onClick }: ConversationItemProps) {
  const timeAgo = formatDistanceToNow(new Date(conversation.timestamp), {
    addSuffix: true,
    locale: vi
  });

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-accent/50 mb-2",
        active && "bg-accent/70"
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border-2">
          <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.user.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm">{truncate(conversation.user.name, { length: 40 })}</span>
        </div>
        <span className="text-sm text-muted-foreground">{truncate(conversation.lastMessage, { length: 40 })}</span>
        <Dot className="w-4 h-4 inline-block" />
        <span className="text-xs text-muted-foreground shrink-0">{timeAgo}</span>
      </div>
      {conversation.unreadCount > 0 && (
        <Badge
          variant="default"
          className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center"
        >
          {conversation.unreadCount}
        </Badge>
      )}
    </button>
  );
}
