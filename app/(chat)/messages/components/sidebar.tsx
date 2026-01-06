'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation, User } from '../utils/types';
import { Search } from 'lucide-react';
import { ConversationItem } from '@/app/(chat)/messages/components/ConversationItem';

interface SidebarProps {
  currentUser: User;
  conversations: Conversation[];
  activeConversationId: string | null;
  onConversationSelect: (id: string) => void;
}

export function Sidebar({ currentUser, conversations, activeConversationId, onConversationSelect }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="px-4 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || '/placeholder.svg'} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">Chats</span>
        </div>
      </div>

      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-accent/50 border-0 focus-visible:ring-1 rounded-full"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pb-4">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              active={activeConversationId === conversation.id}
              onClick={() => onConversationSelect(conversation.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
