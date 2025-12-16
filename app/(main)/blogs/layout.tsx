"use client";

import { TrendingBlogCard } from "@/app/(main)/blogs/components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useFetchPopularBlogsQuery,
  useFetchTagsQuery
} from "@/services/blog/blogApi";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { PopularTags } from "@/app/(social-hub)/components/PopularTags";

export default function BlogLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  const { data: tagsResponse } = useFetchTagsQuery({});

  const popularTags = useMemo(() => {
    return tagsResponse?.data || [];
  }, [tagsResponse]);

  const { data: blogsResponse } = useFetchPopularBlogsQuery({
    page: 1,
    size: 5
  });

  const trendingBlogs = useMemo(() => {
    return blogsResponse?.data?.result || [];
  }, [blogsResponse]);

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
                <PopularTags popularTags={popularTags} />

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
                    {trendingBlogs.length > 0 ? (
                      <div className="space-y-4">
                        {trendingBlogs.map((blog, index) => (
                          <TrendingBlogCard
                            key={blog.blogId}
                            blog={blog}
                            index={index}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Chưa có bài viết xu hướng
                      </p>
                    )}
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
