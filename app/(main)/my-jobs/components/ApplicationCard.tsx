'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/types/model';
import { ApplicationStatus } from '@/types/enum';
import { FileText, Download, Calendar, Mail, Briefcase, Clock, Eye } from 'lucide-react';
import { formatDate, formatDateTime } from '@/utils/formatDate';
import { useState } from 'react';
import CoverLetterDialog from './CoverLetterDialog';
import InterviewDetailDialog from './InterviewDetailDialog';

interface ApplicationCardProps {
  application: Application;
}

const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.ACCEPTED:
      return {
        label: 'Đã chấp nhận',
        variant: 'default' as const,
        className: 'bg-green-500 hover:bg-green-600 text-white',
      };
    case ApplicationStatus.REJECTED:
      return {
        label: 'Đã từ chối',
        variant: 'destructive' as const,
        className: '',
      };
    case ApplicationStatus.PENDING:
    default:
      return {
        label: 'Đang chờ',
        variant: 'secondary' as const,
        className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      };
  }
};

export default function ApplicationCard({ application }: Readonly<ApplicationCardProps>) {
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isInterviewDetailOpen, setIsInterviewDetailOpen] = useState(false);

  const statusConfig = getStatusConfig(application.status);

  const handleViewResume = () => {
    if (application.resume?.fileUrl) {
      window.open(application.resume.fileUrl, '_blank');
    }
  };

  const handleDownloadResume = () => {
    if (application.resume?.fileUrl) {
      const link = document.createElement('a');
      link.href = application.resume.fileUrl;
      link.download = `CV_${application.job?.title || 'Ung_tuyen'}.pdf`;
      link.click();
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold line-clamp-1">{application.job?.title || 'Chưa có tiêu đề'}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{application.email}</span>
              </div>
            </div>
            <Badge variant={statusConfig.variant} className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Ngày ứng tuyển */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Ngày ứng tuyển: {formatDate(application.createdAt)}</span>
          </div>

          {/* Lịch phỏng vấn */}
          {application.interview?.scheduledAt && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">
                Lịch phỏng vấn: {formatDateTime(application.interview.scheduledAt)}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsCoverLetterOpen(true)} className="gap-2">
              <Eye className="h-4 w-4" />
              Xem thư giới thiệu
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleViewResume}
              disabled={!application.resume?.fileUrl}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Xem CV
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadResume}
              disabled={!application.resume?.fileUrl}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Tải CV
            </Button>

            {application.interview?.scheduledAt && (
              <Button variant="default" size="sm" onClick={() => setIsInterviewDetailOpen(true)} className="gap-2">
                <Calendar className="h-4 w-4" />
                Chi tiết phỏng vấn
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CoverLetterDialog
        open={isCoverLetterOpen}
        onOpenChange={setIsCoverLetterOpen}
        coverLetter={application.coverLetter}
        jobTitle={application.job?.title}
      />

      {application.interview && (
        <InterviewDetailDialog
          open={isInterviewDetailOpen}
          onOpenChange={setIsInterviewDetailOpen}
          interview={application.interview}
          jobTitle={application.job?.title}
        />
      )}
    </>
  );
}
