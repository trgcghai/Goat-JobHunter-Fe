"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { ChatRoomItem } from "@/app/(chat)/messages/components/ChatRoomItem";
import { useUser } from "@/hooks/useUser";
import { useChatRooms } from "@/app/(chat)/messages/hooks/useChatRooms";
import { useRouter, useParams } from "next/navigation";
import ErrorMessage from "@/components/common/ErrorMessage";

export function Sidebar() {
  const { user: currentUser } = useUser();
  const { chatRooms, isLoading, isError } = useChatRooms();
  const router = useRouter();
  const params = useParams();
  const activeConversationId = params?.id as string | undefined;

  if (!currentUser) return null;

  const handleSelectConversation = (id: number) => {
    router.push(`/messages/${id}`);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="px-4 h-16 flex items-center justify-between border-b shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.fullName} />
            <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">Chats</span>
        </div>
      </div>

      <div className="p-2 shrink-0">
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
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </>
          )}

          {isError && <ErrorMessage message={"Có lỗi xảy ra khi tải các đoạn chat. Vui lòng thử lại sau."} />}

          {!isLoading && !isError && chatRooms.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No conversations yet</p>
              <p className="text-sm mt-1">Start a new chat to get started</p>
            </div>
          )}

          {!isLoading && !isError && chatRooms.map((chatRoom) => (
            <ChatRoomItem
              key={chatRoom.chatRoomId}
              chatRoom={chatRoom}
              active={activeConversationId === String(chatRoom.chatRoomId)}
              onClick={() => handleSelectConversation(chatRoom.chatRoomId)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}