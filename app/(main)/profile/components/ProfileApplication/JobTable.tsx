import EmptyTable from "@/app/(main)/profile/components/ProfileApplication/EmptyTable";
import ErrorMessage from "@/components/ErrorMessage";
import LoaderSpin from "@/components/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import {
  useGetSavedJobsQuery,
  useUnsaveJobsMutation,
} from "@/services/user/userApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { capitalize } from "lodash";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";

const JobTable = () => {
  const { user } = useUser();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetSavedJobsQuery();
  const [unsaveJobs, { isSuccess: isUnsaveSuccess, isError: isUnsaveError }] =
    useUnsaveJobsMutation();

  const jobs = useMemo(() => data?.data || [], [data]);

  const handleUnsaveJob = async (jobId: number) => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    await unsaveJobs({
      jobIds: [jobId],
    });

    if (isUnsaveSuccess) {
      toast.success("Đã bỏ lưu công việc.");
    }

    if (isUnsaveError) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
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
              const recruiter =
                typeof job.recruiter === "object" ? job.recruiter : undefined;

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
                        onClick={() => handleUnsaveJob(job.jobId)}
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
  );
};

export default JobTable;
