'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '../utils/types';
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4" ref={scrollRef}>
      <div className="py-4 space-y-1">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isOwn={message.senderId === currentUserId} />
        ))}
      </div>
    </ScrollArea>
  );
}
