"use client";

import { BlogCard, BlogFilter } from "@/app/(main)/blogs/components";
import useBlogsFilter from "@/app/(main)/blogs/hooks/useBlogsFilter";
import CustomPagination from "@/components/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function BlogPage() {
  const {
    blogs,
    isLoading,
    isFetching,
    isError,
    filters,
    handleFilterChange,
    resetFilters,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    activeFiltersCount,
  } = useBlogsFilter({
    initialPage: 1,
    itemsPerPage: 10,
    initialFilters: {
      title: "",
      tags: [],
    },
  });

  return (
    <>
      <div className="mb-8">
        <BlogFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Bài Viết Mới Nhất
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Hiển thị{" "}
              <span className="font-semibold text-foreground">
                {blogs.length}
              </span>{" "}
              trong{" "}
              <span className="font-semibold text-foreground">
                {totalItems}
              </span>{" "}
              bài viết
            </p>
            {isFetching && !isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Có lỗi xảy ra</EmptyTitle>
            <EmptyDescription>
              Không thể tải danh sách bài viết. Vui lòng thử lại sau.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {!isLoading && !isError && blogs.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Không tìm thấy bài viết</EmptyTitle>
            <EmptyDescription>
              Không tìm thấy bài viết nào khớp với yêu cầu của bạn
            </EmptyDescription>
          </EmptyHeader>
          {activeFiltersCount > 0 && (
            <Button onClick={resetFilters}>Xóa bộ lọc</Button>
          )}
        </Empty>
      )}

      {!isLoading && !isError && blogs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.blogId} blog={blog} />
            ))}
          </div>

          {!isLoading && (
            <div className="mt-8">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNextPage={nextPage}
                onPreviousPage={previousPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                visiblePageRange={2}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
