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
import { Job } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { ExternalLink, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";

interface JobTableProps {
  jobs: Job[];
}

const JobTable = ({ jobs }: JobTableProps) => {
  if (jobs.length === 0) {
    return <EmptyTable type="jobs" />;
  }

  const handleUnsaveJob = (jobId: number) => {
    // TODO: Implement unsave job logic
    console.log("Unsave job:", jobId);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Mức lương</TableHead>
            <TableHead>Ngày lưu</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => {
            const recruiter =
              typeof job.recruiter === "object" ? job.recruiter : undefined;

            return (
              <TableRow key={job.jobId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
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
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{job.location || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {job.salary ? (
                      <span className="font-medium text-green-600">
                        {job.salary}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Thỏa thuận</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {job.updatedAt ? formatDate(job.updatedAt) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
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
