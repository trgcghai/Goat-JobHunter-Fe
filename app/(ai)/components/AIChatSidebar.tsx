"use client";
import { Menu, SquarePen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import { useState, useMemo } from "react";
import { useGetConversationsQuery } from "@/services/ai/conversationApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useUser } from "@/hooks/useUser";
import { useConversationActions } from "@/hooks/useConversationActions";
import ConversationList from "@/app/(ai)/components/ConversationList";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/components/ui/empty";
import Link from "next/link";

export function AIChatSidebar() {
  const { open, setOpen } = useSidebar();
  const { user, isSignedIn } = useUser();
  const { data, isLoading, isError } = useGetConversationsQuery({}, {
    skip: !user || !isSignedIn || !open
  });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isPinning,
    isUnpinning,
    handleCreateConversation,
    handleTogglePin
  } = useConversationActions();

  const conversations = useMemo(() => data?.data?.result || [], [data]);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    return conversations.filter((conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const pinnedConversations = filteredConversations.filter((conv) => conv.pinned);
  const unpinnedConversations = filteredConversations.filter((conv) => !conv.pinned);

  const messageError: string = useMemo(() => {
    if (!user || !isSignedIn) {
      return "Vui lòng đăng nhập để xem các cuộc trò chuyện của bạn.";
    }
    return "Đã có lỗi xảy ra khi tải các cuộc trò chuyện. Vui lòng thử lại sau.";
  }, [isSignedIn, user]);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
          {open && user && isSignedIn && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCreateConversation}
              className="rounded-lg ml-auto"
              title={"Tạo cuộc trò chuyện mới"}
            >
              <SquarePen className="w-5 h-5" />
            </Button>
          )}
        </div>
        {open && (
          <div className="px-2 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {open && (
            <div className="space-y-2">
              {isLoading && <LoaderSpin />}
              {isError && <ErrorMessage
                message={messageError}
                variant={"compact"}
                className={"rounded-xl"}
                showIcon={false}
              />}
              {pinnedConversations.length > 0 && (
                <>
                  <ConversationList
                    conversations={pinnedConversations}
                    handleTogglePin={handleTogglePin}
                    isLoading={isPinning || isUnpinning}
                  />
                  <Separator />
                </>
              )}
              <ConversationList
                conversations={unpinnedConversations}
                handleTogglePin={handleTogglePin}
                isLoading={isPinning || isUnpinning}
              />
            </div>
          )}
          {user && isSignedIn &&
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCreateConversation}
                className="rounded-lg"
              >
                <SquarePen className="w-5 h-5" />
              </Button>
            </div>
          }

        </SidebarGroup>

        {open && (!user || !isSignedIn) && (
          <Empty>
            <EmptyHeader>
              <EmptyDescription>
                Vui lòng đăng nhập để xem lịch sử trò chuyện
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={"/signin"}>
                <Button variant={"default"} className={"rounded-xl text-xs"} size={"sm"}>
                  Đăng nhập
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}

      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}