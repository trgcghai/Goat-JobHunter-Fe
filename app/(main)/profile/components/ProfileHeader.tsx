"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/model";
import { capitalize } from "lodash";
import { Mail, Shield, User as UserIcon } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);
  const hasAvatar = user.avatar && !imageError;

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="h-24 w-24 rounded-full border-4 border-primary/10 overflow-hidden bg-muted flex items-center justify-center">
            {hasAvatar ? (
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={user.avatar}
                  alt={user.fullName || user.contact.email}
                  onError={() => setImageError(true)}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {(user.fullName || user.contact.email)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserIcon className="w-12 h-12 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {user.fullName || user.contact.email}
              </h1>
            </div>

            <div className="text-sm space-y-1">
              {user.username && (
                <p className="text-sm text-muted-foreground">
                  @ {user.username}
                </p>
              )}

              {user.contact.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.contact.email}</span>
                </div>
              )}

              {user.type && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4 shrink-0" />
                  <span className="capitalize">{capitalize(user.type)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
