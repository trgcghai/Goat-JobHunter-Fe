"use client";

import { DataTable } from "@/components/dataTable/DataTable";
import { Application } from "@/types/model";
import { applicationColumns } from "./ApplicationColumnConfig";

interface ApplicationsTableProps {
  applications: Application[];
  onSelectionChange: (selectedItems: Application[]) => void;
}

export default function ApplicationsTable({
  applications,
  onSelectionChange
}: ApplicationsTableProps) {
  return <DataTable columns={applicationColumns} data={applications} onSelectionChange={onSelectionChange} />;
}
