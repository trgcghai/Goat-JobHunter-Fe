"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Group, SharedLink, SharedMedia, SharedFile } from "../utils/types";
import { Crown, MoreVertical, UserPlus, X, ChevronDown, MessageCircle, User } from "lucide-react";
import { SharedLinksList } from "./SharedLinksList";
import { SharedMediaGrid } from "./SharedMediaGrid";
import { SharedFilesList } from "./SharedFilesList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
                                    currentUserId = "user-1"
                                  }: Readonly<GroupDetailsPanelProps>) {
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  if (!isOpen) return null;

  const currentMember = group.members.find((m) => m.userId === currentUserId);
  const isAdmin = currentMember?.role === "admin";

  return (
    <div className="w-[450px] border-l border-border bg-card shrink-0 flex flex-col h-full min-h-0">
      <div className="h-16 border-b border-border flex items-center justify-between px-4 flex-none">
        <h2 className="font-semibold text-sm">Thông tin đoạn chat</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
              <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg mt-3">{group.name}</h3>
            {group.description && <p className="text-sm text-muted-foreground mt-1">{group.description}</p>}
            <Badge variant="secondary" className="mt-2">
              {group.members.length} members
            </Badge>
          </div>

          <Separator />

          <Collapsible open={isMembersOpen} onOpenChange={setIsMembersOpen}>
            <div className="bg-accent/30 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full flex items-center justify-between p-3 py-6 hover:bg-accent/50 transition-colors cursor-pointer rounded-xl"
                  variant="ghost">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">Thành viên</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isMembersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent
                className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                <div className="px-2 pb-2 space-y-1">
                  {group.members.map((member) => (
                    <div
                      key={member.userId}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <div
                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          {member.role === "admin" && (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1 px-1.5 py-0">
                              <Crown className="h-3 w-3" />
                              Chủ nhóm
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {member.online ? "Online" : "Offline"}
                        </p>
                      </div>


                      {member.name != "You" &&
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Nhắn tin
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Kết bạn
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="h-4 w-4 mr-2" />
                              Xem profile
                            </DropdownMenuItem>

                            {isAdmin && member.userId !== currentUserId && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Crown className="h-4 w-4 mr-2" />
                                  {member.role === "admin" ? "Xóa chủ nhóm" : "Cho làm chủ nhóm"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <X className="h-4 w-4 mr-2 text-destructive" />
                                  Xóa khỏi nhóm
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      }
                    </div>
                  ))}
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl gap-1 w-full justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add member action
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      <span className="text-sm">Thêm thành viên</span>
                    </Button>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Separator />

          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="media">Phương tiện</TabsTrigger>
              <TabsTrigger value="links">Liên kết</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="media" className="mt-4">
              <SharedMediaGrid media={[]} isError={false} isLoading={false} />
            </TabsContent>
            <TabsContent value="links" className="mt-4">
              <SharedLinksList links={sharedLinks} />
            </TabsContent>
            <TabsContent value="files" className="mt-4">
              <SharedFilesList files={[]} isError={false} isLoading={false} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}