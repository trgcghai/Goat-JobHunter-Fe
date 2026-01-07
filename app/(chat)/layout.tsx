import { Sidebar } from '@/app/(chat)/messages/components/Sidebar';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="h-screen flex">
      <div className="w-full md:w-[450px] shrink-0 border-r border-border">
        <Sidebar />
      </div>
      <div className="flex-1 hidden md:flex min-w-0">
        {children}
      </div>
    </div>
  );
}