'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Group, SharedLink, SharedMedia, SharedFile } from '../utils/types';
import { Crown, MoreVertical, UserPlus, X } from 'lucide-react';
import { SharedLinksList } from './SharedLinksList';
import { SharedMediaGrid } from './SharedMediaGrid';
import { SharedFilesList } from './SharedFilesList';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GroupDetailsPanelProps {
  group: Group;
  sharedMedia: SharedMedia[];
  sharedLinks: SharedLink[];
  sharedFiles: SharedFile[];
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

export function GroupDetailsPanel({
  group,
  sharedMedia,
  sharedLinks,
  sharedFiles,
  isOpen,
  onClose,
  currentUserId = 'user-1',
}: GroupDetailsPanelProps) {
  if (!isOpen) return null;

  const currentMember = group.members.find((m) => m.userId === currentUserId);
  const isAdmin = currentMember?.role === 'admin';

  return (
    <div className="w-[450px] border-l border-border bg-card shrink-0 flex flex-col h-full">
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        <h2 className="font-semibold text-sm">Group Details</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Group Info */}
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={group.avatar || '/placeholder.svg'} alt={group.name} />
              <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg mt-3">{group.name}</h3>
            {group.description && <p className="text-sm text-muted-foreground mt-1">{group.description}</p>}
            <Badge variant="secondary" className="mt-2">
              {group.members.length} members
            </Badge>
          </div>

          <Separator />

          {/* Members Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Members</h3>
              {isAdmin && (
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <UserPlus className="h-4 w-4" />
                  Add
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {group.members.map((member) => (
                <div key={member.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      {member.role === 'admin' && (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{member.online ? 'Online' : 'Offline'}</p>
                  </div>
                  {isAdmin && member.userId !== currentUserId && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          {member.role === 'admin' ? 'Remove admin' : 'Make admin'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove from group</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shared Content Tabs */}
          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="media" className="mt-4">
              <SharedMediaGrid media={sharedMedia} />
            </TabsContent>
            <TabsContent value="links" className="mt-4">
              <SharedLinksList links={sharedLinks} />
            </TabsContent>
            <TabsContent value="files" className="mt-4">
              <SharedFilesList files={sharedFiles} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}