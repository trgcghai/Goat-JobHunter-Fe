import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { X, ChevronDown, UserPlus } from "lucide-react";
import { SharedMediaGrid } from "./SharedMediaGrid";
import { SharedFilesList } from "./SharedFilesList";
import { useMemo, useState } from "react";
import { ChatRoom } from "@/types/model";
import { useFetchFilesInChatRoomQuery, useFetchMediaInChatRoomQuery } from "@/services/chatRoom/chatRoomApi";
import { useGetMemberInGroupChatQuery, useAddMemberToGroupMutation } from "@/services/chatRoom/groupChat/groupChatApi";
import { ChatMemberItem } from "@/app/(chat)/messages/components/ChatMemberItem";
import { useUser } from "@/hooks/useUser";
import { SearchUsersModal } from "./SearchUsersModal";
import { User } from "@/types/model";
import { toast } from "sonner";

interface GroupDetailsPanelProps {
  chatRoom: ChatRoom;
  isOpen: boolean;
  onClose: () => void;
}

export function GroupDetailsPanel({
                                    chatRoom,
                                    isOpen,
                                    onClose
                                  }: Readonly<GroupDetailsPanelProps>) {
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  const {
    data: filesData,
    isLoading: isLoadingFile,
    isError: isErrorFile
  } = useFetchFilesInChatRoomQuery({ chatRoomId: chatRoom.roomId }, { skip: !isOpen || !chatRoom });

  const {
    data: mediaData,
    isLoading: isLoadingMedia,
    isError: isErrorMedia
  } = useFetchMediaInChatRoomQuery({ chatRoomId: chatRoom.roomId }, { skip: !isOpen || !chatRoom });

  const { data: memberData } = useGetMemberInGroupChatQuery(chatRoom.roomId, { skip: !isOpen || !chatRoom });

  const [addMember, { isLoading: isAddingMember }] = useAddMemberToGroupMutation();

  const { user } = useUser();

  const members = useMemo(() => {
    return memberData?.data || [];
  }, [memberData]);

  const media = useMemo(() => {
    return mediaData?.data || [];
  }, [mediaData]);

  const files = useMemo(() => {
    return filesData?.data || [];
  }, [filesData]);

  const { currentUserRole, currentUserId } = useMemo(() => {
    const currentMember = members.find(member => member.accountId === user?.accountId);
    return {
      currentUserRole: currentMember ? currentMember.role : "MEMBER",
      currentUserId: user?.accountId || 0
    };
  }, [members, user?.accountId]);

  const canAddMember = currentUserRole === "OWNER" || currentUserRole === "MODERATOR";

  const handleAddMember = async (selectedUser: User) => {
    try {
      await addMember({
        chatroomId: chatRoom.roomId.toString(),
        accountId: selectedUser.accountId
      }).unwrap();

      toast.success(`Đã thêm ${selectedUser.fullName} vào nhóm`);
      setAddMemberModalOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Không thể thêm thành viên vào nhóm");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="w-[450px] border-l border-border bg-card shrink-0 flex flex-col h-full min-h-0">
        <div className="h-16 border-b border-border flex items-center justify-between px-4 flex-none">
          <h2 className="font-semibold text-sm">Thông tin nhóm</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={chatRoom.avatar || "/placeholder.svg"} alt={chatRoom.name} />
                <AvatarFallback>{chatRoom.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mt-3">{chatRoom.name}</h3>
              <Badge variant="secondary" className="mt-2">
                {chatRoom.memberCount} thành viên
              </Badge>
            </div>

            <Separator />

            <Collapsible open={isMembersOpen} onOpenChange={setIsMembersOpen}>
              <div className="bg-accent/30 rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                  <Button
                    className="w-full flex items-center justify-between p-3 py-6 hover:bg-accent/50 transition-colors cursor-pointer rounded-xl"
                    variant="ghost"
                  >
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
                    {canAddMember && (
                      <Button
                        variant="default"
                        className="rounded-xl w-full"
                        onClick={() => setAddMemberModalOpen(true)}
                        disabled={isAddingMember}
                      >
                        <UserPlus className="h-4 w-4" />
                        Thêm thành viên
                      </Button>
                    )}
                    {members && members.length > 0 ? (
                      members.map((member) => (
                        <ChatMemberItem
                          key={member.chatMemberId}
                          member={member}
                          chatroomId={chatRoom.roomId.toString()}
                          currentUserRole={currentUserRole}
                          currentUserId={currentUserId}
                        />
                      ))
                    ) : (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        Không có thành viên
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            <Separator />

            <Tabs defaultValue="media" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="media">Phương tiện</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>
              <TabsContent value="media" className="mt-4">
                <SharedMediaGrid
                  media={media}
                  isLoading={isLoadingMedia}
                  isError={isErrorMedia}
                />
              </TabsContent>
              <TabsContent value="files" className="mt-4">
                <SharedFilesList
                  files={files}
                  isLoading={isLoadingFile}
                  isError={isErrorFile}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>

      <SearchUsersModal
        open={addMemberModalOpen}
        onOpenChange={setAddMemberModalOpen}
        mode="multi"
        onUserSelect={handleAddMember}
      />
    </>
  );
}