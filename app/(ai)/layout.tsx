"use client";

import { AIChatSidebar } from "./components/AIChatSidebar";
import { AIChatHeader } from "./components/AIChatHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AIChatLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {

    if (!isSignedIn) {
      router.push("/chat");
    }

  }, [isSignedIn, router]);


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