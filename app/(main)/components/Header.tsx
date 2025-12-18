"use client";

import NotificationPopup from "@/app/(main)/components/NotificationPopup";
import UserPopup from "@/app/(main)/components/UserPopup";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Trang Chủ" },
  { href: "/jobs", label: "Việc Làm" },
  { href: "/recruiters", label: "Nhà Tuyển Dụng" },
  { href: "/blogs", label: "Blog" },
  { href: "/hub", label: "Story hub" }
] as const;

export default function Header() {
  const { isSignedIn, isSigningOut, signOut } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="GOAT Logo"
              className=""
              width={80}
              height={80}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors pb-1.5",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.label}
                {link.label == "Story hub" &&
                  <Badge className={"ml-2"}>
                    Mới
                  </Badge>
                }
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {!isSignedIn && (
              <>
                <Link href="/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-muted rounded-xl border-primary text-primary"
                  >
                    Đăng Nhập
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  >
                    Đăng Ký
                  </Button>
                </Link>
              </>
            )}
            {isSignedIn && (
              <>
                <NotificationPopup />
                <UserPopup />
                <Button
                  variant={"destructive"}
                  className="rounded-xl"
                  onClick={signOut}
                  disabled={isSigningOut}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
