"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/model";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24 rounded-full border-4 border-primary/10">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.fullName}
            />
            <AvatarFallback className="text-2xl font-semibold">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {user.fullName}
              </h1>
              {user.role?.name && (
                <Badge variant="secondary" className="text-sm">
                  {user.role.name}
                </Badge>
              )}
              {user.enabled !== undefined && (
                <Badge
                  variant={user.enabled ? "default" : "destructive"}
                  className="text-xs"
                >
                  {user.enabled ? "Đã kích hoạt" : "Chưa kích hoạt"}
                </Badge>
              )}
            </div>

            {user.username && (
              <p className="text-sm text-muted-foreground mb-3">
                @{user.username}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {user.contact?.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.contact.email}</span>
                </div>
              )}

              {user.contact?.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{user.contact.phone}</span>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.address}</span>
                </div>
              )}

              {user.dob && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Sinh nhật: {formatDate(user.dob)}</span>
                </div>
              )}

              {user.gender && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium">Giới tính:</span>
                  <span>{user.gender}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
