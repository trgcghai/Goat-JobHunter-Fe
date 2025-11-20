"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE } from "@/constants/constant";
import { useUser } from "@/hooks/useUser";
import { LogOut, Shield, User } from "lucide-react";
import Link from "next/link";

export default function UserPopup() {
  const { user, signOut, isSigningOut } = useUser();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="p-3 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
            {user?.avatar ? (
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.fullName}
                />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-2">
            <div className="p-3 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
              {user?.avatar ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.fullName}
                  />
                  <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">
                {user?.fullName ? user.fullName : "Người Dùng"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.contact.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center cursor-pointer rounded-xl"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Hồ Sơ Cá Nhân</span>
          </Link>
        </DropdownMenuItem>

        {user?.role.name === ROLE.SUPER_ADMIN && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard"
                className="flex items-center cursor-pointer rounded-xl"
              >
                <Shield className="mr-2 h-4 w-4" />
                <span>Bảng Điều Khiển</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer rounded-xl"
          onClick={handleLogout}
          disabled={isSigningOut}
        >
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
          <span>{isSigningOut ? "Đang đăng xuất..." : "Đăng Xuất"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
