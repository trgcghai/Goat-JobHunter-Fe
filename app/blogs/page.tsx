"use client";

import { BlogCard } from "@/app/blogs/components/BlogCard";
import { BlogFilter } from "@/app/blogs/components/BlogFilter";
import TrendingBlogCard from "@/app/blogs/components/TrendingBlogCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { allBlogs } from "@/constants/sample";
import { Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filters, setFilters] = useState({
    searchTerm: "",
  });

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(filters.searchTerm.toLowerCase()),
    );
  }, [filters]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

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
    <main className="flex-1">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BlogFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Bài Viết Mới Nhất
                </h2>
                <p className="text-sm text-muted-foreground">
                  Hiển thị{" "}
                  <span className="font-semibold text-foreground">
                    {paginatedBlogs.length}
                  </span>{" "}
                  trong{" "}
                  <span className="font-semibold text-foreground">
                    {filteredBlogs.length}
                  </span>{" "}
                  bài viết
                </p>
              </div>

              {paginatedBlogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {paginatedBlogs.map((blog) => (
                      <BlogCard key={blog.blogId} blog={blog} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              className="rounded-xl"
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext href="#" className="rounded-xl" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <p className="text-muted-foreground mb-2">
                    Không tìm thấy bài viết nào
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Thử tìm kiếm với từ khóa khác
                  </p>
                </div>
              )}
            </div>

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
    </main>
  );
}
