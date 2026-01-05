'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SharedLink, SharedMedia, User } from '../utils/types';
import { Bell, ShieldBan, UserCircle, X } from 'lucide-react';
import { SharedLinksList } from './sharedLinksList';
import { SharedMediaGrid } from './sharedMediaGrid';

interface ChatDetailsPanelProps {
  user: User;
  sharedMedia: SharedMedia[];
  sharedLinks: SharedLink[];
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDetailsPanel({ user, sharedMedia, sharedLinks, isOpen, onClose }: ChatDetailsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-[450px] border-l border-border bg-card shrink-0 flex flex-col h-full">
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        <h2 className="font-semibold text-sm">Chat Details</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.online && (
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-(--online-indicator) border-2 border-card" />
              )}
            </div>
            <h3 className="font-semibold text-lg mt-3">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.online ? 'Active now' : 'Offline'}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1 bg-transparent" size="sm">
              <UserCircle className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1 bg-transparent" size="sm">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Mute</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1 bg-transparent" size="sm">
              <ShieldBan className="h-5 w-5" />
              <span className="text-xs">Block</span>
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
            <TabsContent value="media" className="mt-4">
              <SharedMediaGrid media={sharedMedia} />
            </TabsContent>
            <TabsContent value="links" className="mt-4">
              <SharedLinksList links={sharedLinks} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
