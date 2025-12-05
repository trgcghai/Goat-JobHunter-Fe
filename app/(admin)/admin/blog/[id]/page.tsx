"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useFetchBlogByIdQuery } from "@/services/blog/blogApi";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { ChevronLeft } from "lucide-react";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MarkdownDisplay from "@/components/common/MarkdownDisplay";

const PreviewDetailBlogPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useFetchBlogByIdQuery(params.id, {
    skip: !params.id
  });

  const blog = useMemo(() => {
    return data?.data;
  }, [data]);

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

  return (
    <main className="min-h-screen bg-gray-50 max-w-5xl mx-auto">
      <Link href={"/admin/blog"}>
        <Button
          variant={"link"}
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại trang blog
        </Button>
      </Link>

      {isLoading && <LoaderSpin />}

      {isError && (
        <ErrorMessage message="Có lỗi xảy ra khi tải thông tin bài viết. Vui lòng thử lại sau." />
      )}

      {blog.banner && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={blog.banner}
            alt={blog.title}
            fill
            className="object-cover" />
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
          {blog.content ? (
            <MarkdownDisplay content={blog.content} />
          ) : (
            <p className="text-foreground leading-relaxed">
              Bài viết này hiện chưa có nội dung.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};
export default PreviewDetailBlogPage;
