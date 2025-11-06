"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase, FileText, Lock, LogOut, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const menuItems = [
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "recruiters", label: "Recruiters", icon: Users },
    { id: "users", label: "Users", icon: Users },
    { id: "roles", label: "Roles", icon: Shield },
    { id: "permissions", label: "Permissions", icon: Lock },
  ];

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
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
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
