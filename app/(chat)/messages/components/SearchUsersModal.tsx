import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLazyCheckExistingChatRoomQuery, useSendMessageToNewChatRoomMutation } from "@/services/chatRoom/chatRoomApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/types/model";
import { UserSearchItem } from "./UserSearchItem";
import { SelectedUsersList } from "./SelectedUsersList";
import { GroupInfoModal } from "./GroupInfoModal";
import { useSearchUsers } from "@/app/(chat)/messages/hooks/useSearchUsers";

interface UserSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "single" | "multi";
}

export function SearchUsersModal({ open, onOpenChange, mode = "single" }: UserSearchModalProps) {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupInfoModalOpen, setGroupInfoModalOpen] = useState(false);

  const {
    keyword,
    setKeyword,
    users,
    isLoading,
    isError,
    isEmpty,
    shouldShowResults
  } = useSearchUsers();

  const [checkExistingChatRoom] = useLazyCheckExistingChatRoomQuery();
  const [sendMessageToNewChatRoom, { isLoading: isCreatingChat }] = useSendMessageToNewChatRoomMutation();

  const handleSelectUser = async (user: User) => {
    if (mode === "single") {
      try {
        const { data: existingChatRoom } = await checkExistingChatRoom(user.accountId).unwrap();

        if (existingChatRoom?.roomId) {
          onOpenChange(false);
          router.push(`/messages/${existingChatRoom.roomId}`);
        } else {
          const result = await sendMessageToNewChatRoom({ accountId: user.accountId }).unwrap();
          if (result.data) {
            onOpenChange(false);
            router.push(`/messages/${result.data.roomId}`);
          }
        }
      } catch (error) {
        toast.error("Không thể tạo cuộc trò chuyện");
        console.error(error);
      }
    } else {
      setSelectedUsers((prev) => {
        const isSelected = prev.some((u) => u.accountId === user.accountId);
        return isSelected ? prev.filter((u) => u.accountId !== user.accountId) : [...prev, user];
      });
    }
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((u) => u.accountId !== userId));
  };

  const handleNext = () => {
    if (selectedUsers.length < 2) {
      toast.error("Vui lòng chọn ít nhất 2 người");
      return;
    }
    setGroupInfoModalOpen(true);
  };

  const handleCloseGroupInfoModal = (open: boolean) => {
    setGroupInfoModalOpen(open);
    if (!open) {
      onOpenChange(false);
      setSelectedUsers([]);
      setKeyword("");
    }
  };

  const handleModalClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setSelectedUsers([]);
      setKeyword("");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {mode === "single" ? "Tìm người dùng" : "Chọn thành viên"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9"
              />
            </div>

            {mode === "multi" && selectedUsers.length > 0 && (
              <SelectedUsersList users={selectedUsers} onRemove={handleRemoveUser} />
            )}

            <ScrollArea className="h-[400px]">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : isError ? (
                <div className="text-center py-8 text-destructive">
                  Có lỗi xảy ra khi tìm kiếm
                </div>
              ) : !shouldShowResults ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nhập ít nhất 2 ký tự để tìm kiếm
                </div>
              ) : isEmpty ? (
                <div className="text-center py-8 text-muted-foreground">
                  Không tìm thấy người dùng
                </div>
              ) : (
                <div className="space-y-1">
                  {users.map((user) => (
                    <UserSearchItem
                      key={user.accountId}
                      user={user}
                      mode={mode}
                      isSelected={selectedUsers.some((u) => u.accountId === user.accountId)}
                      onAction={handleSelectUser}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>

            {mode === "multi" && (
              <Button
                className="w-full"
                onClick={handleNext}
                disabled={selectedUsers.length < 2 || isCreatingChat}
              >
                Tiếp theo ({selectedUsers.length})
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <GroupInfoModal
        open={groupInfoModalOpen}
        onOpenChange={handleCloseGroupInfoModal}
        selectedUsers={selectedUsers}
      />
    </>
  );
}