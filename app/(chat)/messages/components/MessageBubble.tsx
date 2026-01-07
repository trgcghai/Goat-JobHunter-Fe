'use client';

import type { Message } from '../utils/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

export function MessageBubble({ message, isOwn, showAvatar = false }: MessageBubbleProps) {
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), {
    addSuffix: true,
    locale: vi,
  });

  return (
    <div className={cn('flex w-full mb-2', isOwn ? 'justify-end' : 'justify-start')}>
      {!isOwn && (
        <Avatar className="h-10 w-10 mr-2 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || '/placeholder.svg'} alt={message.senderName} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && showAvatar && (
          <span className="text-xs font-medium text-muted-foreground mb-1 px-1">{message.senderName}</span>
        )}
        <div
          className={cn(
            'rounded-2xl px-4 py-2 wrap-break-word',
            isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">{timeAgo}</span>
      </div>
    </div>
  );
}