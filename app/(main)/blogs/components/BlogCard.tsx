"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blog } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { Eye, Heart, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {

  const [imageError, setImageError] = useState(false);
  const hasValidBanner = blog.banner && blog.banner.trim() !== "";

  return (
    <Link href={`/blogs/${blog.blogId}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col py-0 pb-6">
        {hasValidBanner && !imageError ? (
          <Image
            src={blog.banner}
            alt={blog.title}
            className="h-40 w-full object-cover"
            width={400}
            height={160}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-40 w-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        <CardHeader className="shrink-0">
          <div className="mb-2 flex flex-wrap gap-2">
            {blog.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-lg text-foreground line-clamp-2 min-h-14">
            {blog.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatDate(blog.createdAt as "")}
          </p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-10">
            {blog.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {blog.createdBy}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{blog.activity?.totalReads || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{blog.activity?.totalLikes || 0}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
