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
  TableRow,
} from "@/components/ui/table";
import useRecruiterActions from "@/hooks/useRecruiterActions";
import { useGetFollowedRecruitersQuery } from "@/services/user/userApi";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const RecruiterTable = () => {
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetFollowedRecruitersQuery();

  const recruiters = useMemo(() => data?.data || [], [data]);

  const { handleUnfollowRecruiters, isUnfollowing } = useRecruiterActions();

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (recruiters.length === 0) {
    return <EmptyTable type="recruiters" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Đã có lỗi xảy ra khi tải nhà tuyển dụng đã theo dõi. Vui lòng thử lại sau"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên nhà tuyển dụng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            recruiters.map((recruiter) => (
              <TableRow key={recruiter.accountId}>
                <TableCell>
                  <div className="max-w-xs">
                    <Link
                      href={`/recruiters/${recruiter.accountId}`}
                      className="font-medium hover:text-primary hover:underline truncate block"
                    >
                      {recruiter.fullName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <span className="truncate block">
                      {recruiter?.email || "Chưa cung cấp"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <span className="truncate block">
                      {recruiter?.phone || "Chưa cung cấp"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start gap-2">
                    <Link href={`/recruiters/${recruiter.accountId}`}>
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
                      onClick={() =>
                        handleUnfollowRecruiters([recruiter.accountId])
                      }
                      disabled={isUnfollowing}
                      title="Hủy theo dõi"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruiterTable;
