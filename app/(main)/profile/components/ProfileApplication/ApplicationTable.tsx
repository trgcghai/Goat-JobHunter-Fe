import EmptyTable from "@/app/(main)/profile/components/ProfileApplication/EmptyTable";
import StatusBadge from "@/app/(main)/profile/components/ProfileApplication/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { ExternalLink } from "lucide-react";

const ApplicationTable = ({
  applications,
}: {
  applications: Application[];
}) => {
  if (applications.length === 0) {
    return <EmptyTable type="applications" />;
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Nhà tuyển dụng</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày nộp</TableHead>
            <TableHead className="text-right">Xem CV</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => {
            const job =
              typeof application.job === "object" ? application.job : undefined;

            return (
              <TableRow key={application.applicationId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{application.recruiterName}</TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="font-medium truncate">
                      {job?.title || "Vị trí tuyển dụng"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>
                <TableCell>
                  {application.createdAt
                    ? formatDate(application.createdAt)
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  {application.resumeUrl ? (
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
