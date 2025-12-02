"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import EditCareerDialog from "./components/EditCareerDialog";
import { CareerTable } from "./components/CareerTable";
import { Button } from "@/components/ui/button";
import { useFetchCareersQuery } from "@/services/career/careerApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/dataTable/DataTablePagination";
import CareerActions from "./components/CareerActions";
import type { Career } from "@/types/model";

const CareerManagement = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedItems, setSelectedItems] = useState<Career[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useFetchCareersQuery({
    name: nameFilter || undefined,
    page: currentPage,
    size: pageSize
  });

  const careers = useMemo(() => data?.data?.result || [], [data]);
  const totalPages = useMemo(() => data?.data?.meta?.pages || 1, [data]);
  const totalItems = useMemo(() => data?.data?.meta?.total || 0, [data]);

  const handleOpenCreate = () => {
    setSelectedCareer(null);
    setIsEditOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Quản lý ngành nghề</h1>
            <p className="text-sm text-muted-foreground">Quản lý tất cả ngành nghề trong hệ thống</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleOpenCreate} className="rounded-xl">
              <Plus className="w-4 h-4" /> Thêm ngành nghề
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên ngành nghề..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoaderSpin />
            </div>
          ) : isError ? (
            <div className="text-destructive">Có lỗi khi tải ngành nghề</div>
          ) : (
            <>
              <CareerActions selectedItems={selectedItems} />

              <CareerTable careers={careers} onSelectionChange={setSelectedItems} />

              <DataTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                currentItemsCount={careers.length}
                onPageChange={handlePageChange}
                onSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </CardContent>
      </Card>

      <EditCareerDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        career={selectedCareer}
      />
    </div>
  );
};

export default CareerManagement;