'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Job } from '@/types/model';
import { formatDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { capitalize } from 'lodash';
import { Calendar, MapPin, Briefcase, DollarSign, BookmarkCheck, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useJobActions from '@/hooks/useJobActions';

interface SavedJobCardProps {
  job: Job;
}

export default function SavedJobCard({ job }: Readonly<SavedJobCardProps>) {
  const router = useRouter();
  const { handleToggleSaveJob } = useJobActions();

  const handleViewJob = () => {
    router.push(`/jobs/${job.jobId}`);
  };

  const handleUnsaveJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await handleToggleSaveJob(e, job, true); // true means it's currently saved
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors">
                {capitalize(job.level)}
              </Badge>
              <Badge variant={job.active ? 'default' : 'outline'}>{job.active ? 'Đang tuyển' : 'Đã đóng'}</Badge>
              <Badge variant="outline">{capitalize(job.workingType)}</Badge>
            </div>

            <h3
              className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer"
              onClick={handleViewJob}
            >
              {job.title}
            </h3>

            {job.company && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{job.company.name}</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleUnsaveJob}
            className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
          >
            <BookmarkCheck className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.address?.province || 'Chưa cập nhật'}</span>
          </div>
          {job.startDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Bắt đầu: {formatDate(job.startDate)}</span>
            </div>
          )}
        </div>

        {/* Salary */}
        {job.salary && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-600">{formatCurrency(job.salary)}</span>
          </div>
        )}

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 5).map((skill) => (
              <Badge key={skill.skillId} variant="outline" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {job.skills.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button variant="default" size="sm" onClick={handleViewJob} className="w-full gap-2">
            <Eye className="h-4 w-4" />
            Xem chi tiết & Ứng tuyển
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
