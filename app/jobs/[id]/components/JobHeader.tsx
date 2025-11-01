import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

function JobHeader({ job }: { job: Job }) {
  return (
    <>
      <div className="h-48 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <Briefcase className="h-24 w-24 text-primary" />
      </div>
      <CardContent className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-sm">
            {job.level}
          </Badge>
          <Badge
            variant={job.active ? "default" : "outline"}
            className="text-sm"
          >
            {job.active ? "Đang tuyển" : "Đã đóng"}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {job.workingType}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
      </CardContent>
    </>
  );
}

export default JobHeader;
