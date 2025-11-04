"use client";

import { BlogCard } from "@/app/(main)/blogs/components/BlogCard";
import { BlogFilter } from "@/app/(main)/blogs/components/BlogFilter";
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

  return (
    <>
      <div className="mb-8">
        <BlogFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

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
                    <PaginationPrevious href="#" className="rounded-xl" />
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
    </>
  );
}
