import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ThumbsUp, Eye, MessageCircle } from "lucide-react"
import Image from "next/image"

interface PostCardProps {
  post: {
    challenge: string | null
    author: {
      name: string
      avatar: string
      time: string
    }
    title: string
    excerpt: string
    image: string | null
    badge?: string
    tags: Array<{ label: string; variant: "blue" | "gray" }>
    stats: {
      likes: number
      views: number
      comments: number
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border border-border bg-card transition-shadow hover:shadow-md">
      <div className="p-6">
        {post.challenge && (
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-primary">{post.challenge}</span>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">{post.author.time}</span>
              </div>
            </div>

            <h3 className="mb-2 text-lg font-bold leading-snug text-balance">{post.title}</h3>

            <p className="mb-4 text-sm text-muted-foreground line-clamp-2 text-pretty">{post.excerpt}</p>

            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={tag.variant === "blue" ? "secondary" : "outline"}
                    className={
                      tag.variant === "blue"
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-none"
                        : "text-muted-foreground"
                    }
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.stats.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{post.stats.views}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span>{post.stats.comments}</span>
              </div>
            </div>
          </div>

          {post.image && (
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg">
              <Image src={post.image || "/placeholder.svg"} alt="Post thumbnail" fill className="object-cover" />
              {post.badge && (
                <div className="absolute bottom-2 left-2 rounded-full bg-gradient-to-r from-pink-600 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  {post.badge}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor" />
      <path d="M19 4L19.5 5.5L21 6L19.5 6.5L19 8L18.5 6.5L17 6L18.5 5.5L19 4Z" fill="currentColor" />
      <path d="M19 16L19.5 17.5L21 18L19.5 18.5L19 20L18.5 18.5L17 18L18.5 17.5L19 16Z" fill="currentColor" />
    </svg>
  )
}
