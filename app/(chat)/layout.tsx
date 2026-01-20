'use client';

import { Sidebar } from '@/app/(chat)/messages/components/Sidebar';
import { useSubscribeToMessagesQuery } from '@/services/chatRoom/message/messageApi';
import { useUser } from '@/hooks/useUser';

interface ChatLayoutProps {
  readonly children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {

  const { isSignedIn } = useUser();

  useSubscribeToMessagesQuery(undefined, { skip: !isSignedIn });

  console.log("Test");

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-full md:w-[450px] shrink-0 border-r border-border">
        <Sidebar />
      </div>
      <div className="flex-1 hidden md:flex min-w-0 min-h-0">
        {children}
      </div>
    </div>
  );
}