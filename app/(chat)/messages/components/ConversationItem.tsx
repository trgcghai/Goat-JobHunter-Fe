'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Conversation } from '../utils/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, active, onClick }: ConversationItemProps) {
  const displayName = conversation.isGroup ? conversation.group?.name : conversation.user?.name;
  const displayAvatar = conversation.isGroup ? conversation.group?.avatar : conversation.user?.avatar;
  const isOnline = !conversation.isGroup && conversation.user?.online;

  const timeAgo = formatDistanceToNow(conversation.timestamp, {
    addSuffix: true,
    locale: vi,
  });

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-accent/50',
        active && 'bg-accent/60'
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={displayAvatar || '/placeholder.svg'} alt={displayName} />
          <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        {isOnline && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
        )}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm truncate">{displayName}</h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">{timeAgo}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            {conversation.unreadCount > 0 && (
              <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}