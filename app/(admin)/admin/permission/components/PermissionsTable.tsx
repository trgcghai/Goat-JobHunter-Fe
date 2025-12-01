"use client";
import { DataTable } from "@/components/dataTable/DataTable";
import { permissionColumns } from "./PermissionColumnConfig";
import { Permission } from "@/types/model";

interface PermissionsTableProps {
  permissions: Permission[];
  onSelectionChange: (selected: Permission[]) => void;
}

export default function PermissionsTable({ permissions, onSelectionChange }: PermissionsTableProps) {
  return <DataTable columns={permissionColumns} data={permissions} onSelectionChange={onSelectionChange} />;
}