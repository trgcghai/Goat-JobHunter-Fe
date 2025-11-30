import { Menu, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIChatSidebar() {
  return (
    <aside className="w-16 border-r  flex flex-col items-center py-4 gap-4">
      <Button variant="ghost" size="icon" className="rounded-xl">
        <Menu className="w-6 h-6" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-xl" title={"Tạo đoạn chat mới"}>
        <SquarePen className="w-5 h-5" />
      </Button>
    </aside>
  );
}