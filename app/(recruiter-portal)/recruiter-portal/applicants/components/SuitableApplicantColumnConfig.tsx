"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { capitalize } from "lodash";
import type { Applicant } from "@/types/model";
import SuitableApplicantActionsCell
  from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/SuitableApplicantActionsCell";

export const applicantColumns: ColumnDef<Applicant>[] = [
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
    )
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.getValue("fullName") ? String(row.getValue("fullName")) : "Chưa cung cấp"}
        </span>
        <span className="text-sm text-muted-foreground">
          {capitalize(row.original.username || "")}
        </span>
      </div>
    )
  },
  {
    id: "email",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email liên hệ" />,
    cell: ({ row }) => <div className="font-medium">{row.original.contact?.email || "Chưa cung cấp"}</div>
  },
  {
    accessorKey: "address",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Địa điểm" />,
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("address") || "Chưa cung cấp"}</div>
  },
  {
    accessorKey: "level",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trình độ" />,
    cell: ({ row }) => <div className="max-w-xs truncate">{capitalize(row.getValue("level")) || "Chưa cung cấp"}</div>
  },
  {
    accessorKey: "education",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Học vấn" />,
    cell: ({ row }) => <div
      className="max-w-xs truncate">{capitalize(row.getValue("education")) || "Chưa cung cấp"}</div>
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thao tác" />,
    cell: ({ row }) => <SuitableApplicantActionsCell applicant={row.original} />
  }
];

