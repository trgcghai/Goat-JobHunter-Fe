"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { UserHoverCard } from "./UserHoverCard";
import Link from "next/link";
import RichTextPreview from "@/components/RichText/Preview";
import { RowsPhotoAlbum } from "react-photo-album";
import { RenderBlogImage } from "@/components/common/Photo/RenderNextImage";
import { useMemo } from "react";
import formatImageUrlsForPhotoView from "@/utils/formatImageUrlsForPhotoView";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeBlogDetail } from "@/lib/features/blogDetailSlice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import BlogActivity from "@/app/(social-hub)/hub/fyp/component/BlogActivity";

export function BlogDetailDialog() {
  const dispatch = useAppDispatch();
  const { blog, open } = useAppSelector((state) => state.blogDetail);

  const handleClose = () => {
    dispatch(closeBlogDetail());
  };

  const formattedImageUrls = useMemo(
    () => formatImageUrlsForPhotoView(blog?.images),
    [blog?.images]
  );

  if (!blog || !open) return null;

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
    locale: vi
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <VisuallyHidden>
        <DialogTitle />
      </VisuallyHidden>
      <DialogContent className="max-w-4xl! p-0 pb-4 gap-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt={blog.author.fullName} />
                <AvatarFallback>{blog.author.fullName[0]}</AvatarFallback>
              </Avatar>
              <div>
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
            </div>
          </div>

          <ScrollArea className="h-[700px]">
            <div className="p-4">
              <RichTextPreview content={blog.content} className="mb-4" />

              {blog.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {formattedImageUrls.length > 0 && (
                <div className="mb-2 border">
                  <RowsPhotoAlbum
                    photos={formattedImageUrls}
                    render={{ image: RenderBlogImage }}
                    spacing={0}
                  />
                </div>
              )}

              <BlogActivity
                blog={blog}
                onLikeClick={() => {}}
                onCommentClick={() => {}}
                className="p-0 my-2"
              />

              <div className="space-y-4">
                <h3 className="font-semibold">
                  Bình luận ({blog.activity?.totalComments || 0})
                </h3>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chưa có bình luận nào
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}