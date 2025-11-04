import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<
    string,
    {
      variant: "default" | "secondary" | "destructive" | "outline";
      label: string;
    }
  > = {
    Pending: { variant: "secondary", label: "Đang chờ" },
    "Pending Review": { variant: "secondary", label: "Đang xem xét" },
    "Interview Scheduled": { variant: "default", label: "Đã lên lịch PV" },
    "Interview Completed": { variant: "default", label: "Hoàn thành PV" },
    "Offer Sent": { variant: "default", label: "Đã gửi offer" },
    Accepted: { variant: "default", label: "Đã chấp nhận" },
    Rejected: { variant: "destructive", label: "Từ chối" },
    Withdrawn: { variant: "outline", label: "Đã rút" },
  };

  const config = statusConfig[status] || {
    variant: "outline" as const,
    label: status,
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default StatusBadge;
