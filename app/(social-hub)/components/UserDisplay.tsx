"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function UserDisplay() {
  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatar-person.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link href="/hub/profile" className="text-sm font-semibold text-foreground truncate">
              Nguyễn Văn A
            </Link>
            <p className="text-xs text-muted-foreground">@nguyenvana</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}