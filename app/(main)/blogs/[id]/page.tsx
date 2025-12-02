"use client";

import {
  BlogActions,
  CommentSection
} from "@/app/(main)/blogs/[id]/components";
import useDetailBlog from "@/app/(main)/blogs/[id]/hooks/useDetailBlog";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { formatDate } from "@/utils/formatDate";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const DetailBlogPage = () => {
  const params = useParams<{ id: string }>();
  const { blog, isLoading, isError, author, isLoadingComments, isLoadCommentsFailed, comments, totalComments } = useDetailBlog(
    params.id
  );
  if (!blog && (isLoading || isError === false)) {
    return <LoaderSpin />;
  }

  if (!blog && isError) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message="Không thể tải thông tin bài viết. Vui lòng thử lại sau." />
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Không tìm thấy bài viết</EmptyTitle>
          <EmptyDescription>
            Bài viết bạn đang tìm kiếm không tồn tại. Hãy thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.toString());
      toast.success(`Đã sao chép liên kết bài viết`);
    } catch (err) {
      console.error("Không thể copy:", err);
      toast.error("Sao chép liên kết thất bại. Vui lòng thử lại.");
    }
  };

  const handleLike = () => {
    toast.info("Tính năng thích bài viết đang được phát triển.");
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
            <Avatar className="h-12 w-12 border">
              <AvatarImage
                src={author?.avatar || ""}
                alt={author?.fullName || blog?.author.fullName}
              />
              <AvatarFallback>
                {author?.fullName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-base text-foreground">
                {author?.fullName ||
                  author?.contact.email ||
                  blog?.author.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
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
          {blog.content ? (
            <MarkdownDisplay content={blog.content} />
          ) : (
            <p className="text-foreground leading-relaxed">
              Bài viết này hiện chưa có nội dung.
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <BlogActions
          totalLikes={blog.activity?.totalLikes}
          totalComments={blog.activity?.totalComments}
          onLike={handleLike}
          onShare={handleShare}
        />
      </div>

      <CommentSection initialComments={comments} isLoading={isLoadingComments} isError={isLoadCommentsFailed} totalComments={totalComments} />
    </main>
  );
};

export default DetailBlogPage;