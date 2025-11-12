import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useCurrencyFormat from "@/hooks/useCurrencyFormat";
import { Job } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { Bookmark, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface JobGridCardProps {
  job: Job;
  isSaved: boolean;
  handleSaveJob: (e: React.MouseEvent) => void;
  onLevelClick?: (level: string) => void;
  onWorkingTypeClick?: (workingType: string) => void;
}

const JobGridCard = ({
  job,
  isSaved,
  handleSaveJob,
  onLevelClick,
  onWorkingTypeClick,
}: JobGridCardProps) => {
  const { format } = useCurrencyFormat();

  return (
    <Link href={`/jobs/${job.jobId}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="flex gap-2 mb-2">
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLevelClick?.(job.level);
                }}
              >
                {job.level.charAt(0).toUpperCase() +
                  job.level.slice(1).toLowerCase()}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onWorkingTypeClick?.(job.workingType || "");
                }}
              >
                {job.workingType.charAt(0).toUpperCase() +
                  job.workingType.slice(1).toLowerCase()}
              </Badge>
              <Badge variant={job.active ? "default" : "outline"}>
                {job.active ? "Đang tuyển" : "Đã đóng"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-background/80"
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
            </div>
          </div>
          <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-1">
            {job.title}
          </h3>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold text-primary">
                {format(job.salary)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {job.createdAt && <span>{formatDate(job.createdAt)}</span>}
            </div>
          </div>

          <p className="text-sm text-foreground line-clamp-2 mb-4">
            {job.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 3).map((skill) => (
                <Badge
                  key={skill.skillId}
                  variant="outline"
                  className="text-xs"
                >
                  {skill.name}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobGridCard;
