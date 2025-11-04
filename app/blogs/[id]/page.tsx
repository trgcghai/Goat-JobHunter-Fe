"use client";

import { BlogActions } from "@/app/blogs/[id]/components/BlogActions";
import { CommentSection } from "@/app/blogs/[id]/components/CommentSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { allBlogs } from "@/constants/sample";
import { formatDate } from "@/utils/formatDate";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const DetailBlogPage = () => {
  const params = useParams<{ id: string }>();
  const blog = allBlogs.find((b) => b.blogId === params.id);

  if (!blog) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Không tìm thấy bài viết
            </h1>
            <Link href="/blogs">
              <Button>Quay lại trang blog</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const initialComments = [
    {
      id: "1",
      author: "Nguyễn Văn A",
      avatar: "/placeholder.svg",
      content: "Bài viết rất hữu ích, cảm ơn tác giả!",
      createdAt: "2025-11-01T10:00:00Z",
      replies: [
        {
          id: "1-1",
          author: "Admin",
          avatar: "/placeholder.svg",
          content: "Cảm ơn bạn đã đọc bài viết!",
          createdAt: "2025-11-01T11:00:00Z",
        },
      ],
    },
    {
      id: "2",
      author: "Trần Thị B",
      avatar: "/placeholder.svg",
      content: "Mình đã thử theo hướng dẫn và rất hiệu quả.",
      createdAt: "2025-11-02T14:30:00Z",
    },
  ];

  const handleShare = () => {
    console.log("Share blog:", blog.blogId);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Link
        href="/blogs"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Quay lại trang blog
      </Link>

      {blog.banner && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={blog.banner}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="bg-white rounded-xl p-8 mb-6 border">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt={blog.createdBy} />
              <AvatarFallback>
                {blog.createdBy?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{blog.createdBy}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(blog.createdAt || "")}
              </p>
            </div>
          </div>
        </div>

        {blog.description && (
          <div className="text-lg text-muted-foreground mb-6 italic border-l-4 border-primary pl-4">
            {blog.description}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {blog.content && blog.content.length > 0 ? (
            blog.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-foreground leading-relaxed">
              Nội dung bài viết sẽ được hiển thị ở đây. Đây là một bài viết mẫu
              về {blog.title.toLowerCase()}.
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <BlogActions
          initialLikes={blog.activity?.totalLikes}
          totalComments={blog.activity?.totalComments}
          onShare={handleShare}
        />
      </div>

      <CommentSection initialComments={initialComments} />
    </main>
  );
};

export default DetailBlogPage;
