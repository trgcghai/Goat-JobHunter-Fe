"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, User2, Tag, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/hub/fyp", label: "Trang chủ", icon: Home },
  { href: "/hub/profile", label: "Trang cá nhân", icon: User2 },
  { href: "/hub/tags", label: "Khám phá Tags", icon: Tag },
  { href: "/hub/saved", label: "Đã lưu", icon: Bookmark },
] as const;

export function NavigationBar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Card>
      <CardContent className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start relative rounded-xl transition-colors",
                  active
                    ? "text-primary hover:text-primary hover:bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className="h-5 w-5 mr-2" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}