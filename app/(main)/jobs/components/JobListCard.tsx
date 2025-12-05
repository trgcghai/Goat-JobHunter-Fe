import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Job } from "@/types/model";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { capitalize } from "lodash";
import { Bookmark, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface JobListCardProps {
  job: Job;
  isSaved: boolean;
  handleSaveJob: (e: React.MouseEvent) => void;
  onLevelClick?: (level: string) => void;
  onWorkingTypeClick?: (workingType: string) => void;
}

const JobListCard = ({
  job,
  isSaved,
  handleSaveJob,
  onLevelClick,
  onWorkingTypeClick,
}: JobListCardProps) => {
  return (
    <Link href={`/jobs/${job.jobId}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 mb-4 relative">
        <div className="flex gap-6 p-6">
          <div className="flex-1">
            <CardHeader className="p-0 mb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
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
                    <Badge variant={job.active ? "default" : "outline"}>
                      {job.active ? "Đang tuyển" : "Đã đóng"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onWorkingTypeClick?.(job.workingType || "");
                      }}
                    >
                      {capitalize(job.workingType)}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-1 pr-12">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {job.startDate && (
                        <span>{formatDate(job.startDate)}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-background/80 mb-2"
                    onClick={handleSaveJob}
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        isSaved
                          ? "fill-primary text-primary"
                          : "fill-white text-foreground"
                      }`}
                    />
                  </Button>
                  <div className="flex items-center gap-1 font-semibold text-primary text-lg">
                    <span>{formatCurrency(job.salary)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {job.quantity} vị trí
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 mb-4">
              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill.skillId}
                      variant="outline"
                      className="text-xs"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default JobListCard;
