import EmptyTable from "@/app/(main)/profile/components/ProfileApplication/EmptyTable";
import ResumePreviewDialog from "@/components/common/ResumePreivewDialog";
import StatusBadge from "@/app/(main)/profile/components/ProfileApplication/StatusBadge";
import CustomPagination from "@/components/common/CustomPagination";
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
import { useFetchApplicationsByCurrentApplicantQuery } from "@/services/application/applicationApi";
import { Application } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { capitalize } from "lodash";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

const ApplicationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data, isLoading, isError, isSuccess, refetch } =
    useFetchApplicationsByCurrentApplicantQuery({
      page: currentPage,
    });

  const applications = useMemo(() => data?.data?.result || [], [data]);
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

  const handlePreviewResume = (application: Application) => {
    setSelectedApplication(application);
    setIsPreviewOpen(true);
  };

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (applications.length === 0) {
    return <EmptyTable type="applications" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Đã có lỗi xảy ra khi tải các đơn ứng tuyển. Vui lòng thử lại sau"
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
              <TableHead>Nhà tuyển dụng</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày nộp</TableHead>
              <TableHead className="text-right">Xem CV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              applications?.map((application) => {
                const job =
                  typeof application.job === "object"
                    ? application.job
                    : undefined;

                return (
                  <TableRow key={application.applicationId}>
                    <TableCell>{application.recruiterName}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">
                          {job?.title || "Vị trí tuyển dụng"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={capitalize(application.status)} />
                    </TableCell>
                    <TableCell>
                      {application.createdAt
                        ? formatDate(application.createdAt)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {application.resumeUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handlePreviewResume(application)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
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
              visiblePageRange={2}
            />
          </div>
        )}
      </div>

      {selectedApplication && (
        <ResumePreviewDialog
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          application={selectedApplication}
        />
      )}
    </>
  );
};

export default ApplicationTable;
