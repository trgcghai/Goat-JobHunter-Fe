"use client";

import { Loader2, Plus } from "lucide-react";
import { UserFilter } from "./components/UserFilter";
import { UserTable } from "./components/UserTable";
import useUsersManagement from "./hooks/useUsersManagement";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserActions from "./components/UserActions";
import { useState } from "react";
import { User } from "@/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminUserPage = () => {
  const {
    users,
    meta,
    page,
    size,
    filters,
    isLoading,
    isError,
    handlePageChange,
    handleSizeChange,
    handleFilterChange,
    resetFilters
  } = useUsersManagement();
  const [selectedItems, setSelectedItems] = useState<User[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Quản lý người dùng</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý tất cả người dùng trong hệ thống
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={"/admin/user/form"}>
              <Button className="rounded-xl">
                <Plus className="w-4 h-4" />
                Thêm người dùng
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <UserFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />

          {isLoading && (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          )}

          {isError && (
            <ErrorMessage
              message="Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau."
            />
          )}

          {!isError && (
            <>
              <UserActions
                selectedCount={selectedItems.length}
                selectedIds={selectedItems.map((item) => item.userId)}
              />

              <UserTable
                users={users}
                onSelectionChange={setSelectedItems}
              />

              <DataTablePagination
                currentPage={page}
                totalPages={meta.pages}
                pageSize={size}
                totalItems={meta.total}
                currentItemsCount={users.length}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserPage;