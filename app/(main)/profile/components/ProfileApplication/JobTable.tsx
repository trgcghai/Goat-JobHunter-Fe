import EmptyTable from "@/app/(main)/profile/components/ProfileApplication/EmptyTable";
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
import { useSaveJobsMutation } from "@/services/user/userApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const JobTable = () => {
  const { user } = useUser();
  const [saveJobs, { isSuccess, isError }] = useSaveJobsMutation();

  if ((user?.savedJobs || []).length === 0) {
    return <EmptyTable type="jobs" />;
  }

  const handleUnsaveJob = async (jobId: number) => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này.");
      return;
    }

    await saveJobs({
      userId: user.userId,
      savedJobs: user.savedJobs
        .filter((job) => job.jobId !== jobId)
        .map((j) => ({ jobId: j.jobId })),
    });

    if (isSuccess) {
      toast.success("Đã bỏ lưu công việc.");
    }

    if (isError) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

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
          {(user?.savedJobs || []).map((job) => {
            const recruiter =
              typeof job.recruiter === "object" ? job.recruiter : undefined;

            return (
              <TableRow key={job.jobId}>
                <TableCell>
                  <div className="max-w-xs">
                    <Link
                      href={`/jobs/${job.jobId}`}
                      className="font-medium hover:text-primary hover:underline truncate block"
                    >
                      {job.title}
                    </Link>
                    <p className="text-sm text-muted-foreground truncate">
                      {job.level || "Chưa xác định"}
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
                      <span className="text-muted-foreground">Thỏa thuận</span>
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
