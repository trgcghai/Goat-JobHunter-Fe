"use client";

import { NotificationPopup } from "@/app/(main)/components/NotificationPopup";
import { UserPopup } from "@/app/(main)/components/UserPopup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  // Replace with actual authentication logic
  const isLoggedIn = true;

  // Replace with actual user data
  const user = {
    name: "John Doe",
    avatar: "/user-avatar.jpg",
    email: "john.doe@example.com",
    role: "Admin",
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Trang Chủ
            </Link>
            <Link
              href="/jobs"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Việc Làm
            </Link>
            <Link
              href="/recruiters"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Nhà Tuyển Dụng
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
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
            ) : (
              <>
                <NotificationPopup />
                <UserPopup user={user} onLogout={handleLogout} />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
