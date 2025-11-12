import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { Building2 } from "lucide-react";

function JobInfoSidebar({ job }: { job: Job }) {
  const infoItems = [
    {
      label: "Cấp độ",
      value: (
        <Badge variant="secondary" className="capitalize">
          {capitalizeText(job.level)}
        </Badge>
      ),
    },
    {
      label: "Hình thức",
      value: <Badge variant="outline">{capitalizeText(job.workingType)}</Badge>,
    },
    { label: "Số lượng", value: `${job.quantity} vị trí` },
    {
      label: "Mức lương",
      value: `$${job.salary.toLocaleString()}`,
      highlight: true,
    },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        Thông Tin Công Việc
      </h3>
      <div className="space-y-3">
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
    </div>
  );
}
export default JobInfoSidebar;
