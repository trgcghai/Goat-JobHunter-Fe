import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { User } from "@/types/model";

interface SelectedUsersListProps {
  users: User[];
  onRemove: (userId: number) => void;
}

export function SelectedUsersList({ users, onRemove }: SelectedUsersListProps) {
  if (users.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-accent/30 rounded-lg">
      {users.map((user) => (
        <div
          key={user.accountId}
          className="flex items-center gap-2 bg-background border rounded-full pl-1 pr-3 py-1"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">
              {user.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user.fullName}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-4 w-4 rounded-full p-0 hover:bg-destructive/20"
            onClick={() => onRemove(user.accountId)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}