'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageType } from '@/types/model';
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: MessageType[];
  currentUserId?: string;
  isGroup?: boolean;
}

export function MessageList({ messages, currentUserId, isGroup = false }: Readonly<MessageListProps>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="px-4 h-full" ref={scrollRef}>
      <div className="py-4 space-y-1">
        {messages.map((message) => (
          <MessageBubble
            key={message.messageId}
            message={message}
            isOwn={message.senderId === currentUserId}
            showAvatar={isGroup}
          />
        ))}
      </div>
    </ScrollArea>
  );
}