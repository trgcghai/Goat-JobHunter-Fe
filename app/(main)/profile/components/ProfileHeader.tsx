"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <User className="h-4 w-4" />
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
