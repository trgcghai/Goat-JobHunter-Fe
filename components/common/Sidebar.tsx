"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarTab {
  id: string;
  label: string;
  url: string;
  type?: "internal" | "external";
  icon: React.ReactNode;
}

interface SidebarProps {
  tabs: SidebarTab[];
  logoHref: string;
}

export default function Sidebar({ tabs, logoHref }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useUser();

  return (
    <div className="fixed z-50 left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 space-y-8">
      <div className="flex items-center gap-2">
        <Link href={logoHref} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="GOAT Logo"
            className=""
            width={80}
            height={80}
          />
        </Link>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => {
          return (
            <Link key={tab.id} href={tab.url} className="block" target={tab.type == "external" ? "_blank" : "_self"}>
              <Button
                variant={pathname?.includes(tab.id) ? "default" : "ghost"}
                className={cn(
                  "w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all",
                )}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-2 pt-4">
        <Button
          variant={"destructive"}
          className="w-full rounded-xl"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng xuất</span>
        </Button>
      </div>
    </div>
  );
}
