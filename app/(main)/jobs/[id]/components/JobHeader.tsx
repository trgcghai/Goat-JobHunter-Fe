import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Job } from "@/types/model";
import { capitalize } from "lodash";

function JobHeader({ job }: { job: Job }) {
  return (
    <>
      <CardContent className="p-6 pb-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-sm">
            {capitalize(job.level)}
          </Badge>
          <Badge
            variant={job.active ? "default" : "outline"}
            className="text-sm"
          >
            {job.active ? "Đang tuyển" : "Đã đóng"}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {capitalize(job.workingType)}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
      </CardContent>
    </>
  );
}

export default JobHeader;
