"use client";

import TrendingBlogCard from "@/app/(main)/blogs/components/TrendingBlogCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { allBlogs } from "@/constants/sample";
import { Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get trending blogs (most reads)
  const trendingBlogs = useMemo(() => {
    return [...allBlogs]
      .sort(
        (a, b) => (b.activity?.totalReads || 0) - (a.activity?.totalReads || 0),
      )
      .slice(0, 5);
  }, []);

  // Get all unique tags
  const popularTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    allBlogs.forEach((blog) => {
      blog.tags?.forEach((tag) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  return (
    <div className="flex-1">
      <section className="border-b border-border bg-primary/5 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Khám phá các bài viết hữu ích về sự nghiệp
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{children}</div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">
                        Từ Khóa Nổi Bật
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs?tag=${tag}`}
                          className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">
                        Bài Viết Xu Hướng
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trendingBlogs.map((blog, index) => (
                        <TrendingBlogCard
                          key={blog.blogId}
                          blog={blog}
                          index={index}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
