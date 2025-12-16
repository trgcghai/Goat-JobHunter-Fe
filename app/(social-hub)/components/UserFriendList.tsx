import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const friends = [
  {
    id: 1,
    name: "Nguyễn Trường Nguyên",
    avatar: "/avatar-man.png",
    isOnline: true,
  },
  {
    id: 2,
    name: "Chính Nguyễn",
    avatar: "/avatar-woman.png",
    isOnline: true,
  },
  {
    id: 3,
    name: "Van Nguyen",
    avatar: "/avatar-person.jpg",
    isOnline: false,
  },
  {
    id: 4,
    name: "Minh Hoàng",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: 5,
    name: "Thu Phương",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
  },
]

export function UserFriendList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Liên hệ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-3 group">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              {friend.isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-pink-600 transition-colors cursor-pointer">
                {friend.name}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
