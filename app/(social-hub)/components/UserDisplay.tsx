"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

export function UserDisplay() {

  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user) {
    return <Card>
      <CardContent className="flex flex-col gap-4">
        <Link href="/signin">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-muted rounded-xl border-primary text-primary w-full"
          >
            Đăng Nhập
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-full"
          >
            Đăng Ký
          </Button>
        </Link>
      </CardContent>
    </Card>;
  }

  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatar-person.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link href="/profile" className="text-sm font-semibold text-foreground truncate">
              {user?.fullName || user?.contact.email}
            </Link>
            <p className="text-xs text-muted-foreground">@{user?.username}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}