"use client";
import { Menu, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIChatSidebar() {
  const handleNewChat = () => {
    // Dispatch custom event để notify chat page
    window.dispatchEvent(new CustomEvent("clearChat"));
  };

  return (
    <aside className="w-16 border-r  flex flex-col items-center py-4 gap-4">
      <Button variant="ghost" size="icon" className="rounded-xl">
        <Menu className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl"
        title={"Tạo đoạn chat mới"}
        onClick={handleNewChat}
      >
        <SquarePen className="w-5 h-5" />
      </Button>
    </aside>
  );
}