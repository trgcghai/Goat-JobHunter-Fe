"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface UserPopupProps {
  user: User;
  onLogout: () => void;
  onClose: () => void;
}

export function UserPopup({ user, onLogout, onClose }: UserPopupProps) {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-border bg-card shadow-lg p-4 z-50">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="h-12 w-12 rounded-full object-cover"
          width={48}
          height={48}
        />
        <div>
          <p className="font-semibold text-card-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Vai Trò:</span>{" "}
        {user.role}
      </p>

      <div className="mb-4 border-t border-border" />

      <div className="flex flex-col gap-2">
        <Link href="/profile">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent rounded-xl"
            onClick={onClose}
          >
            Hồ Sơ Cá Nhân
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          className="w-full rounded-xl"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          Đăng Xuất
        </Button>
      </div>
    </div>
  );
}
