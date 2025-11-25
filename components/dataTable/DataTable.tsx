"use client";

import { useDataTable } from "@/components/dataTable/useDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableContent } from "./DataTableContent";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useDataTable({
    data,
    columns,
  });

  return (
    <div className="space-y-4">
      <DataTableContent table={table} columns={columns} />
    </div>
  );
}
