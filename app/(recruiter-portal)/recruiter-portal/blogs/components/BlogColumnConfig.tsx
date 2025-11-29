"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Blog } from "@/types/model";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { Edit, Eye, Trash2 } from "lucide-react";

export const recruiterBlogColumns: ColumnDef<Blog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "title",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiêu đề" />
    )
  },
  {
    accessorKey: "category",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Các danh mục" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="flex flex-wrap gap-2 max-w-[300px]">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const isDraft = row.original.draft;
      return (
        <Badge variant={!isDraft ? "default" : "secondary"}>
          {!isDraft ? "Đã xuất bản" : "Bản nháp"}
        </Badge>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      const startDate = row.getValue("createdAt") as string;
      return <div>{formatDate(startDate)}</div>;
    }
  },
  {
    id: "actions",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="flex items-center gap-4">
          <Button
            size={"icon"}
            className={"rounded-xl"}
            variant={"outline"}
            title="Xem chi tiết"
            onClick={() => console.log(blog)}
          >
            <Eye className={"h-4 w-4"} />
          </Button>
          <Button
            size={"icon"}
            className={"rounded-xl"}
            variant={"outline"}
            title="Chỉnh sửa"
            onClick={() => console.log(blog)}
          >
            <Edit className={"h-4 w-4"} />
          </Button>
          <Button
            size={"icon"}
            className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            variant={"outline"}
            title="Xóa"
            onClick={() => console.log(blog)}
          >
            <Trash2 className={"h-4 w-4"} />
          </Button>
        </div>
      );
    }
  }
];