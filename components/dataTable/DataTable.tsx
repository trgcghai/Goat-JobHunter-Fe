"use client";

import { useDataTable } from "@/components/dataTable/useDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableContent } from "./DataTableContent";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  toolbar?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const table = useDataTable({
    data,
    columns,
    pageSize,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {toolbar}
        <DataTableViewOptions table={table} />
      </div>
      <DataTableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}
