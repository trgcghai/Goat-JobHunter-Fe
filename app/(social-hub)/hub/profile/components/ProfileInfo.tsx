import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { UserResponse } from "@/types/dto";
import { Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProfileInfo() {

  const { user } = useUser(); // Get user data from redux store

  if (!user) return null;

  const { username, fullName, email, headline, bio } = user as UserResponse;

  return (
    <Card className="mt-16 border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              {fullName || email}
            </h1>
          </div>

          <div className="text-sm space-y-1">
            {username && (
              <p className="text-sm text-muted-foreground">
                @ {username}
              </p>
            )}

            {email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            )}
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <p className="text-sm">
              {headline ?? "Chưa cập nhật"}
            </p>
            <p className="text-sm">
              {bio ?? "Chưa có tiểu sử cá nhân."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
