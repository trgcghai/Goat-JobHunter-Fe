"use client";
import { Menu, SquarePen, MessageSquare, Search, Pin } from "lucide-react";
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

export function AIChatSidebar() {
  const { open, setOpen } = useSidebar();
  const { user, isSignedIn } = useUser();
  const { data, isLoading, isError } = useGetConversationsQuery({}, {
    skip: !user || !isSignedIn || !open
  });
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = useMemo(() => data?.data || [], [data]);
  const pinnedConversations = conversations.filter((conv) => conv.pinned);
  const unpinnedConversations = conversations.filter((conv) => !conv.pinned);

  const messageError: string = useMemo(() => {

    if (!user || !isSignedIn) {
      return "Vui lòng đăng nhập để xem các cuộc trò chuyện của bạn.";
    }

    return "Đã có lỗi xảy ra khi tải các cuộc trò chuyện. Vui lòng thử lại sau.";
  }, [isSignedIn, user]);

  const handleNewChat = () => {
    console.log("New chat initiated");
  };

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
          {open && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              className="rounded-lg ml-auto"
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
          {open ? (
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
                  <div className="space-y-1">
                    {pinnedConversations.map((conv) => (
                      <div key={conv.conversationId} className="group relative">
                        <Button variant={"secondary"}>
                          <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{conv.title}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-100 group-hover:opacity-100"
                        >
                          <Pin className="w-3.5 h-3.5 fill-current" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </>
              )}
              <div className="space-y-1">
                {unpinnedConversations.map((conv) => (
                  <div key={conv.conversationId} className="group relative">
                    <Button variant={"ghost"}>
                      <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{conv.title}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100"
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewChat}
                className="rounded-lg"
              >
                <SquarePen className="w-5 h-5" />
              </Button>
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}