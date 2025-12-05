"use client";

import ApplicationActionsCell
  from "@/app/(recruiter-portal)/recruiter-portal/applications/components/ApplicationActionsCell";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/model";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalize } from "lodash";
import { ApplicationStatus } from "@/types/enum";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "ACCEPTED":
      return "bg-green-500 hover:bg-green-600";
    case "REJECTED":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500";
  }
};

export const applicationColumns: ColumnDef<Application>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,

    header: ({ table }) => {
      const rows = table.getRowModel().rows;

      // Chỉ lấy rows pending
      const pendingRows = rows.filter(
        (r) => r.original.status === ApplicationStatus.PENDING
      );

      // Kiểm tra pending rows có đang được chọn hết không,
      // nếu table hiện tại không có pending rows thì select all sẽ không được chọn
      const allPendingSelected =
        pendingRows.length > 0 &&
        pendingRows.every((r) => r.getIsSelected());

      // custom toggle chỉ áp dụng cho pending rows
      const toggle = (checked: boolean) => {
        pendingRows.forEach((row) => row.toggleSelected(checked));
      };

      return (
        <Checkbox
          checked={allPendingSelected}
          onCheckedChange={(value) => toggle(!!value)}
          aria-label="Select all"
        />
      );
    },

    cell: ({ row }) => {
      const disabled = row.original.status !== ApplicationStatus.PENDING;

      return (
        <Checkbox
          disabled={disabled}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            // Không cho chọn nếu không pending
            if (!disabled) row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className={"cursor-pointer"}
        />
      );
    },
  },
  {
    accessorKey: "user.fullName",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên ứng viên" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.original.user.fullName
            ? row.original.user.fullName
            : "Chưa cung cấp"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email liên hệ" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "job.title",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Công việc ứng tuyển" />
    ),
    cell: ({ row }) => (
      <div
        className="font-medium max-w-xs truncate"
        title={row.original.job.title}
      >
        {row.original.job.title}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày nộp" />
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={`${getStatusColor(status)} text-white border-none py-1`}
        >
          {capitalize(status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thao tác" />
    ),
    cell: ({ row }) => <ApplicationActionsCell application={row.original} />,
  },
];
