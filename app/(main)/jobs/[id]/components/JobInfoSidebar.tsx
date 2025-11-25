import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Job } from "@/types/model";
import { formatCurrency } from "@/utils/formatCurrency";
import { capitalize } from "lodash";
import { Building2 } from "lucide-react";

interface JobInfoSidebarProps {
  job: Job;
  numberOfApplications: number;
}

function JobInfoSidebar({ job, numberOfApplications }: JobInfoSidebarProps) {
  const infoItems = [
    {
      label: "Cấp độ",
      value: (
        <Badge variant="secondary" className="capitalize">
          {capitalize(job.level)}
        </Badge>
      ),
    },
    {
      label: "Hình thức",
      value: <Badge variant="outline">{capitalize(job.workingType)}</Badge>,
    },
    { label: "Số lượng", value: `${job.quantity} vị trí` },
    {
      label: "Mức lương",
      value: `${formatCurrency(job.salary)}`,
      highlight: true,
    },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        Thông Tin Công Việc
      </h3>
      <div className="flex flex-col">
        <div className="flex-1 space-y-3 mb-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{item.label}</span>
              <span
                className={item.highlight ? "text-primary font-semibold" : ""}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center bg-primary/10 px-4 py-2 mt-4 border border-primary rounded-xl">
          <span className="text-primary">Số lượng đơn đã nộp:</span>
          <span className="text-primary font-semibold">
            {numberOfApplications}
          </span>
        </div>
      </div>
    </div>
  );
}
export default JobInfoSidebar;
