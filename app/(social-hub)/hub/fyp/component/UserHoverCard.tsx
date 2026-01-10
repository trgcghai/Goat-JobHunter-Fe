import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus, MessageCircle } from "lucide-react"
import Link from "next/link"

interface UserHoverCardProps {
  userId: number
  fullName: string
  avatar?: string
  username?: string
  bio?: string
  children: React.ReactNode
}

export function UserHoverCard({
  userId,
  fullName,
  avatar,
  username,
  bio,
  children
}: Readonly<UserHoverCardProps>) {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-xl" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback>{fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Link
                href={`/hub/users/${userId}`}
                className="text-base font-semibold hover:underline"
              >
                {fullName}
              </Link>
              {username && (
                <p className="text-sm text-muted-foreground">@{username}</p>
              )}
            </div>
          </div>

          {bio && (
            <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
          )}

          <div className="flex gap-2">
            <Button className="flex-1 rounded-xl" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Kết bạn
            </Button>
            <Button variant="secondary" className="flex-1 rounded-xl" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Nhắn tin
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}