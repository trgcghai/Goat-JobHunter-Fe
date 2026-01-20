'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, AlertCircle } from 'lucide-react';
import { UserSearchResultItem } from './UserSearchResultItem';
import { useSearchUsers } from '../hooks/useSearchUsers';
import type { User } from '@/types/model';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useLazyCheckExistingChatRoomQuery } from '@/services/chatRoom/chatRoomApi';
import { useRouter } from 'next/navigation';

interface SearchUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchUsersModal({ open, onOpenChange }: SearchUsersModalProps) {
  const { keyword, setKeyword, users, isLoading, isError, isEmpty, shouldShowResults } = useSearchUsers();
  const router = useRouter();
  const [checkExistingRoom] = useLazyCheckExistingChatRoomQuery();

  const [processingUserId, setProcessingUserId] = useState<number | null>(null);

  const handleMessage = async (user: User) => {
    if (!user?.accountId) return;

    setProcessingUserId(user?.accountId);

    console.log('Start chat with user:', user);

    try {
      // Check if chat room already exists
      const { data: existingRoom } = await checkExistingRoom(user?.accountId).unwrap();

      console.log(existingRoom);

      if (existingRoom?.roomId) {

        // Navigate to existing room
        router.push(`/messages/${existingRoom.roomId}`);
        onOpenChange(false);
      } else {

        // Navigate to new chat page with recipient query param, not creating room yet
        router.push(`/messages/new?recipient=${user?.accountId}`);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleAddFriend = async (user: User) => {
    console.log('Add friend:', user);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl! max-h-[80vh] flex flex-col gap-0 p-0 rounded-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle>Tìm kiếm người dùng</DialogTitle>
          <DialogDescription>
            Tìm kiếm theo email để bắt đầu cuộc trò chuyện
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Nhập email người dùng (tối thiểu 2 ký tự)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-9 bg-accent/50 border focus-visible:ring-1 rounded-xl"
              autoFocus
            />
          </div>

          {keyword.length > 0 && keyword.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">
              Nhập thêm ít nhất {2 - keyword.length} ký tự để tìm kiếm
            </p>
          )}
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-2 pb-6">
            {!shouldShowResults && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Nhập email để tìm kiếm người dùng</p>
              </div>
            )}

            {isLoading && shouldShowResults && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-9 w-24 rounded-full" />
                  </div>
                ))}
              </>
            )}

            {isError && shouldShowResults && (
              <ErrorMessage message="Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại." />
            )}

            {isEmpty && (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Không tìm thấy người dùng nào</p>
                <p className="text-xs mt-1">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}

            {!isLoading && shouldShowResults && users.length > 0 && (
              <>
                {users.map((user) => (
                  <UserSearchResultItem
                    key={user?.accountId}
                    user={user}
                    onMessage={handleMessage}
                    onAddFriend={handleAddFriend}
                    isLoadingMessage={processingUserId === user?.accountId}
                  />
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}