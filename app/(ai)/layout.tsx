import type { Metadata } from "next";
import { AIChatSidebar } from "./components/AIChatSidebar";
import { AIChatHeader } from "./components/AIChatHeader";

export const metadata: Metadata = {
  title: "AI Chat - GOAT",
  description: "Chat với trợ lý AI của GOAT",
};

export default function AIChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <AIChatSidebar />

      <div className="flex-1 flex flex-col">
        <AIChatHeader />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}