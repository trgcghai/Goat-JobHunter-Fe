"use client";

import { UserPopup } from "@/app/(main)/components/UserPopup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface HeaderProps {
  isLoggedIn: boolean;
  user: User;
}

export function Header({ isLoggedIn, user }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                  className="hover:bg-muted rounded-xl border-primary text-primary"
                >
                  Đăng Nhập
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                >
                  Đăng Ký
                </Button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full border border-border p-1 hover:bg-muted transition-colors"
                >
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                </button>
                {showUserMenu && (
                  <UserPopup
                    user={user}
                    onLogout={() => {}}
                    onClose={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
