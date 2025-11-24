import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export const jobColumns: ColumnDef<Job>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiêu đề" />
    ),
    cell: ({ row }) => (
      <div className="font-medium max-w-xs">
        <Link
          href={`/jobs/${row.original.jobId}`}
          className="hover:text-primary hover:underline line-clamp-2"
        >
          {row.getValue("title")}
        </Link>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cấp độ" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("level")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "workingType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hình thức" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize">
        {row.getValue("workingType")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("active") as boolean;
      return (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={isActive ? "bg-green-600" : "bg-gray-500"}
        >
          {isActive ? "Đang tuyển" : "Đã đóng"}
        </Badge>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày bắt đầu" />
    ),
    cell: ({ row }) => {
      const startDate = row.getValue("startDate") as string;
      return <div>{formatDate(startDate)}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày kết thúc" />
    ),
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as string;
      return <div>{formatDate(endDate)}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <div>{formatDate(createdAt)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cập nhật" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string | null;
      return <div>{updatedAt ? formatDate(updatedAt) : "-"}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thao tác" />
    ),
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/jobs/${job.jobId}`}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              title="Xem chi tiết"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/recruiter-portal/jobs/${job.jobId}/edit`}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              title="Chỉnh sửa"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => console.log("Delete job:", job.jobId)}
            title="Xóa"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export const recruiterJobColumns = jobColumns.filter(
  (column) =>
    !["level", "workingType"].includes(
      ("accessorKey" in column ? column.accessorKey : column.id) as string,
    ),
);
