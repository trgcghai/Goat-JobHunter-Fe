"use client";

import { AdminTab } from "@/app/(admin)/dashboard/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: AdminTab[];
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  tabs,
}: AdminSidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
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
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all",
              )}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-2 pt-4">
        <Button variant={"destructive"} className="w-full rounded-xl">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
}
