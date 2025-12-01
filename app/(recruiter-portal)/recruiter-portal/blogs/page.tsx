"use client";

import BlogsTable from "@/components/management/blogs/BlogsTable";
import RecruiterBlogFilter from "@/components/management/blogs/recruiter/RecruiterBlogFilter";
import { useBlogManagement } from "@/app/(recruiter-portal)/recruiter-portal/blogs/hooks/useBlogManagement";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Blog } from "@/types/model";
import BlogActions from "@/components/management/blogs/BlogActions";
import ErrorMessage from "@/components/common/ErrorMessage";
import { recruiterBlogColumns } from "@/components/management/blogs/BlogColumnConfig";

const BlogManagementPage = () => {
  const {
    blogs,
    meta,
    isLoading,
    isError,
    page,
    size,
    filters,
    setPage,
    handleSizeChange,
    handleFilterChange,
    resetFilters,
  } = useBlogManagement({});
  const [selectedItems, setSelectedItems] = useState<Blog[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Danh sách bài viết</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý các bài viết của bạn
            </p>
          </div>

          <Link href="/recruiter-portal/blogs/form">
            <Button className="rounded-xl">
              <Plus className="h-4 w-4" />
              Thêm bài viết mới
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <RecruiterBlogFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />

          {isError && <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau."} />}

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoaderSpin />
            </div>
          ) : (
            <>
              <BlogActions
                selectedCount={selectedItems.length}
                selectedIds={selectedItems.map(b => b.blogId)}
              />

              <BlogsTable blogs={blogs} onSelectionChange={setSelectedItems} columns={recruiterBlogColumns}/>

              <DataTablePagination
                currentPage={page}
                totalPages={meta.pages}
                pageSize={size}
                totalItems={meta.total}
                currentItemsCount={blogs.length}
                onPageChange={setPage}
                onSizeChange={handleSizeChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagementPage;