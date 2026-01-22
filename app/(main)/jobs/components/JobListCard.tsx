import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { Job } from '@/types/model';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { Calendar, MapPin } from 'lucide-react';

interface JobListCardProps {
  job: Job;
  isSaved: boolean;
  handleSaveJob: (e: React.MouseEvent) => void;
  onLevelClick?: (level: string) => void;
  onWorkingTypeClick?: (workingType: string) => void;
  onJobClick?: (jobId: number) => void;
  isSelected?: boolean;
}

const JobListCard = ({ job, onLevelClick, onWorkingTypeClick, onJobClick, isSelected }: JobListCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onJobClick) {
      onJobClick(job.jobId);
    }
  };

  return (
    <div onClick={handleClick} className="block cursor-pointer">
      <Card
        className={`overflow-hidden hover:shadow-lg transition-all py-0 mb-3 relative ${isSelected ? 'border-l-4 border-l-primary shadow-lg' : ''}`}
      >
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <CardHeader className="p-0 gap-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onLevelClick?.(job.level);
                      }}
                    >
                      {capitalize(job.level)}
                    </Badge>
                    <Badge variant={job.active ? 'default' : 'outline'}>{job.active ? 'Đang tuyển' : 'Đã đóng'}</Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onWorkingTypeClick?.(job.workingType || '');
                      }}
                    >
                      {capitalize(job.workingType)}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-foreground pr-12">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.address.province}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {job.startDate && <span>{formatDate(job.startDate)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobListCard;
