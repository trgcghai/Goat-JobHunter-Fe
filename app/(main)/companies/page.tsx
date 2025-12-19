"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import CustomPagination from "@/components/common/CustomPagination";
import { Building2, Search, MapPin, Users, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CompanySize } from "@/types/enum";
import { useUser } from "@/hooks/useUser";
import { useCompanyFilter } from "./hooks/useCompaniesFilter";
import { useSearchParams } from "next/navigation";

const getCompanySizeLabel = (size: CompanySize) => {
  const labels: Record<CompanySize, string> = {
    [CompanySize.STARTUP]: "Khởi nghiệp",
    [CompanySize.SMALL]: "1-50 nhân viên",
    [CompanySize.MEDIUM]: "51-200 nhân viên",
    [CompanySize.LARGE]: "201-500 nhân viên",
    [CompanySize.ENTERPRISE]: "500+ nhân viên",
  };
  return labels[size] || size;
};

export default function CompaniesPage() {
  const [searchInput, setSearchInput] = useState("");

  const searchParams = useSearchParams()
  const {
    companies,
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
  } = useCompanyFilter({
    initialPage: 1,
    itemsPerPage: 9,
    initialFilters: {
      name: "",
    }
  });

  const handleSearch = () => {
    handleFilterChange({ name: searchInput });
  };

  const handleReset = () => {
    setSearchInput("");
    resetFilters();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="mb-6">
          <Skeleton className="h-12 w-full max-w-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Đã có lỗi xảy ra</EmptyTitle>
          <EmptyDescription>
            Không thể tải danh sách công ty. Vui lòng thử lại sau.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Khám phá các công ty</h1>
        <p className="text-muted-foreground">
          Tìm hiểu về các công ty tuyển dụng hàng đầu
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm công ty theo tên..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={isFetching}>
            {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Tìm kiếm
          </Button>
          {filters.name && (
            <Button variant="outline" onClick={handleReset}>
              Đặt lại
            </Button>
          )}
        </div>
      </div>

      {/* Results Info */}
      {filters.name && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Tìm thấy <span className="font-semibold">{totalItems}</span> công ty
            với từ khóa <span className="font-semibold">{filters.name}</span>
          </p>
        </div>
      )}

      {/* Companies Grid */}
      {companies.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Không tìm thấy công ty nào</EmptyTitle>
            <EmptyDescription>
              {filters.name
                ? "Hãy thử tìm kiếm với từ khóa khác"
                : "Hiện tại chưa có công ty nào"}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {companies.map((company) => (
              <Link
                key={company.accountId}
                href={`/companies/${company.accountId}`}
                className="block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={company.name}
                            fill
                            className="object-contain rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1 truncate">
                          {company.name}
                        </CardTitle>
                        {company.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Đã xác thực
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">
                      {company.description || "Chưa có mô tả"}
                    </CardDescription>
                    <div className="space-y-2 text-sm">
                      {company.address && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{company.address}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 flex-shrink-0" />
                        <span>{getCompanySizeLabel(company.size)}</span>
                      </div>
                      {company.website && (
                        <div className="flex items-center gap-2 text-primary">
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate text-sm">
                            {company.website}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              onNextPage={nextPage}
              onPreviousPage={previousPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          )}
        </>
      )}
    </div>
  );
}