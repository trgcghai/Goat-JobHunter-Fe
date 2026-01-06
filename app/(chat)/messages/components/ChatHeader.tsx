'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { User } from '../utils/types';
import { Info, Phone, Video } from 'lucide-react';

interface ChatHeaderProps {
  user: User;
  onToggleDetails?: () => void;
  isDetailsOpen?: boolean;
}

export function ChatHeader({ user, onToggleDetails, isDetailsOpen }: ChatHeaderProps) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {user.online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-sm">{user.name}</h2>
          <p className="text-xs text-muted-foreground">{user.online ? 'Active now' : 'Offline'}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={onToggleDetails}
          data-active={isDetailsOpen}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
