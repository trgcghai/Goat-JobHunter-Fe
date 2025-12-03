"use client";

import { AIChatSidebar } from "./components/AIChatSidebar";
import { AIChatHeader } from "./components/AIChatHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AIChatLayout({
 children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AIChatSidebar />

      <div className="flex-1 flex flex-col">
        <AIChatHeader />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}