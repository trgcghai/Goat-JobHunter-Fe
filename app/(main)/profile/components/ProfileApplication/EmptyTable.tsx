import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface EmptyTableProps {
  type: "jobs" | "applications";
}

const EmptyTable = ({ type }: EmptyTableProps) => {
  const config = {
    jobs: {
      title: "Không có việc làm nào đã lưu",
      description:
        "Bạn chưa lưu việc làm nào. Bắt đầu khám phá và lưu những việc làm thú vị ngay hôm nay!",
    },
    applications: {
      title: "Không có ứng tuyển nào đã lưu",
      description:
        "Bạn chưa ứng tuyển vị trí nào. Bắt đầu khám phá và ứng tuyển những vị trí thú vị ngay hôm nay!",
    },
  };

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{config[type].title}</EmptyTitle>
        <EmptyDescription>{config[type].description}</EmptyDescription>
      </EmptyHeader>
      <Button variant="default" asChild className="rounded-xl" size="sm">
        <Link href="/jobs">
          Khám phá ngay <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
};

export default EmptyTable;
