'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User, Group } from '../utils/types';
import { Info, Phone, Video, Users } from 'lucide-react';
import { useMemo } from "react";

interface ChatHeaderProps {
  user?: User;
  group?: Group;
  isGroup?: boolean;
  onToggleDetails?: () => void;
  isDetailsOpen?: boolean;
}

export function ChatHeader({ user, group, isGroup, onToggleDetails, isDetailsOpen }: Readonly<ChatHeaderProps>) {
  const displayName = isGroup ? group?.name : user?.name;
  const displayAvatar = isGroup ? group?.avatar : user?.avatar;
  const isOnline = !isGroup && user?.online;
  const memberCount = isGroup ? group?.members.length : undefined;

  const statusText = useMemo(() => {
    if (isGroup) return group?.description || `${memberCount} members`;

    if (isOnline) return "Đang hoạt động";

    return "Không hoạt động";
  }, [group?.description, isGroup, isOnline, memberCount])

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={displayAvatar || '/placeholder.svg'} alt={displayName} />
            <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm">{displayName}</h2>
            {isGroup && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                {memberCount}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {statusText}
          </p>
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