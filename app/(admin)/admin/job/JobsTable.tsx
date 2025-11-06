"use client";

import { DataTable } from "@/components/dataTable/DataTable";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  applicants: number;
  status: "active" | "closed";
  postedDate: string;
};

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
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "applicants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicants" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("applicants")} applicants</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={status === "active" ? "bg-green-600" : ""}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "postedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted Date" />
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => console.log(job)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      );
    },
  },
];

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "Ho Chi Minh City",
    applicants: 24,
    status: "active",
    postedDate: "2024-11-01",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Hanoi",
    applicants: 18,
    status: "active",
    postedDate: "2024-10-28",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Cloud Solutions",
    location: "Da Nang",
    applicants: 31,
    status: "active",
    postedDate: "2024-10-25",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "StartUp Inc",
    location: "Ho Chi Minh City",
    applicants: 12,
    status: "closed",
    postedDate: "2024-10-20",
  },
];

export default function JobsTable() {
  return (
    <Card>
      <CardContent>
        <DataTable columns={jobColumns} data={jobs} />
      </CardContent>
    </Card>
  );
}
