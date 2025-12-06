import EmptyTable from "@/app/(main)/profile/components/ProfileApplication/EmptyTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useJobActions from "@/hooks/useJobActions";
import { useGetSavedJobsQuery } from "@/services/user/userApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { capitalize } from "lodash";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import CustomPagination from "@/components/common/CustomPagination";

const JobTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetSavedJobsQuery();
  const { handleUnsaveJob } = useJobActions();

  const jobs = useMemo(() => data?.data?.result || [], [data]);
  const meta = useMemo(() => data?.data?.meta, [data]);

  const totalPages = useMemo(() => meta?.pages || 0, [meta]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (jobs.length === 0) {
    return <EmptyTable type="jobs" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Đã có lỗi xảy ra khi tải công việc đã lưu. Vui lòng thử lại sau"
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Nhà tuyển dụng</TableHead>
              <TableHead>Địa điểm</TableHead>
              <TableHead>Mức lương</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              jobs &&
              jobs.map((job) => {
                const recruiter = typeof job.recruiter === "object" ? job.recruiter : undefined;

                return (
                  <TableRow key={job.jobId}>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium hover:text-primary hover:underline truncate block">
                          {job.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {capitalize(job.level) || "Chưa xác định"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {recruiter ? (
                          <Link
                            href={`/recruiters/${recruiter.userId}`}
                            className="hover:text-primary hover:underline truncate block"
                          >
                            {recruiter.fullName}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">
                                                  Chưa có thông tin
                                              </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 max-w-xs">
                        <span className="truncate">{job.location || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {job.salary ? (
                          <span className="font-medium text-green-600">
                                                  {formatCurrency(job.salary)}
                                              </span>
                        ) : (
                          <span className="text-muted-foreground">
                                                  Thỏa thuận
                                              </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {job.startDate ? formatDate(job.startDate) : "-"}
                    </TableCell>
                    <TableCell>
                      {job.endDate ? formatDate(job.endDate) : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <Link href={`/jobs/${job.jobId}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl"
                            title="Xem chi tiết"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleUnsaveJob(job)}
                          title="Bỏ lưu"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div>
        {totalPages > 1 && (
          <div className="flex justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              hasNextPage={currentPage < totalPages}
              hasPreviousPage={currentPage > 1}
              visiblePageRange={2} />
          </div>
        )}
      </div>
    </>
  );
};

export default JobTable;
