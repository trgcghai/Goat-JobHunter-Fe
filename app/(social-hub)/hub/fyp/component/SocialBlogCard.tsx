import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ThumbsUp, Eye, MessageCircle, Bookmark } from "lucide-react"
import { Blog } from "@/types/model"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { UserHoverCard } from "@/app/(social-hub)/hub/fyp/component/UserHoverCard";
import Link from "next/link";
import { RowsPhotoAlbum } from "react-photo-album";
import { RenderBlogImage } from "@/components/common/Photo/RenderNextImage";
import { useMemo } from "react";
import RichTextPreview from "@/components/RichText/Preview";
import formatImageUrlsForPhotoView from "@/utils/formatImageUrlsForPhotoView";

interface SocialBlogCardProps {
  blog: Blog
}

export function SocialBlogCard({ blog }: SocialBlogCardProps) {
  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
    locale: vi
  });

  const formattedImageUrls = useMemo(
    () => formatImageUrlsForPhotoView(blog?.images),
    [blog?.images]
  );

  return (
    <Card className="overflow-hidden border border-border bg-card py-0 gap-0">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt={blog.author.fullName} />
            <AvatarFallback>{blog.author.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <UserHoverCard
              userId={blog.author.userId}
              fullName={blog.author.fullName}
              avatar="/placeholder.svg"
              username="username"
              bio="Bio của người dùng"
            >
              <Link
                href={`/hub/users/${blog.author.userId}`}
                className="text-sm font-semibold hover:underline cursor-pointer"
              >
                {blog.author.fullName}
              </Link>
            </UserHoverCard>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug">{blog.title}</h3>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{blog.description}</p>

        <RichTextPreview content={blog.content} className="mb-3 text-sm" />

        {blog.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {formattedImageUrls.length > 0 && (
        <RowsPhotoAlbum
          photos={formattedImageUrls}
          render={{ image: RenderBlogImage }}
          spacing={0}
        />
      )}

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4" />
            <span>{blog.activity?.totalLikes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span>{blog.activity?.totalComments || 0}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span>{blog.activity?.totalReads || 0}</span>
        </div>
      </div>
    </Card>
  )
}