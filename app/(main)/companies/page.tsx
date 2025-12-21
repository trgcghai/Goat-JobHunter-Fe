'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import CustomPagination from '@/components/common/CustomPagination';
import { Loader2, TrendingUp } from 'lucide-react';
import { useCompanyFilter } from './hooks/useCompaniesFilter';
import CompanyFilter from './components/CompanyFilter';
import CompanyCard from './components/CompanyCard';

export default function CompaniesPage() {
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
        activeFiltersCount,
        companiesData,
        isFetchingCompanies,
        nameInputValue,
        handleNameInputChange,
    } = useCompanyFilter({
        initialPage: 1,
        itemsPerPage: 4,
        initialFilters: {
            name: '',
            addresses: [],
            verified: undefined,
        },
    });

    return (
        <div className="flex-1">
            <section className="border-b border-border bg-primary/5 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        27,055 đánh giá về các công ty hàng đầu
                    </h1>
                    <p className="text-muted-foreground">Mọi người đang nói gì về công ty của bạn? Tìm hiểu ngay!</p>
                </div>
            </section>

            <section className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <CompanyFilter
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onResetFilters={resetFilters}
                                activeFiltersCount={activeFiltersCount}
                                companies={companiesData}
                                isFetchingCompanies={isFetchingCompanies}
                                nameInputValue={nameInputValue}
                                onNameInputChange={handleNameInputChange}
                            />

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
                                            Không thể tải danh sách công ty. Vui lòng thử lại sau.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            )}

                            {!isLoading && !isError && companies.length === 0 && (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyTitle>Không tìm thấy công ty</EmptyTitle>
                                        <EmptyDescription>
                                            Không tìm thấy công ty nào khớp với yêu cầu của bạn
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            )}

                            {!isLoading && !isError && companies.length > 0 && (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                        {companies.map((company) => (
                                            <CompanyCard key={company.accountId} company={company} />
                                        ))}
                                    </div>

                                    {!isLoading && (
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
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        <h3 className="text-2xl font-bold text-foreground">Đánh Giá Mới Nhất</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Chưa có đánh giá mới nào được thêm vào.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
