import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react";

function JobInfoGrid({ job }: { job: Job }) {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  const infoItems = [
    {
      icon: MapPin,
      label: "Địa điểm",
      value: job.location,
    },
    {
      icon: DollarSign,
      label: "Lương",
      value: `$${job.salary.toLocaleString()}`,
    },
    {
      icon: Users,
      label: "Số lượng",
      value: `${job.quantity} vị trí`,
    },
    {
      icon: Calendar,
      label: "Ngày bắt đầu",
      value: formatDate(job.startDate),
    },
    {
      icon: Clock,
      label: "Hạn nộp",
      value: formatDate(job.endDate),
    },
    {
      icon: Calendar,
      label: "Đăng",
      value: job.createdAt ? formatDate(job.createdAt) : "",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <item.icon className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-foreground">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobInfoGrid;
