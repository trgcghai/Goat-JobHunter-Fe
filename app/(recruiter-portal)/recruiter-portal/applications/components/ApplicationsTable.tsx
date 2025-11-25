"use client";

import { DataTable } from "@/components/dataTable/DataTable";
import { Application } from "@/types/model";
import { applicationColumns } from "./ApplicationColumnConfig";

interface ApplicationsTableProps {
  applications: Application[];
}

export default function ApplicationsTable({
  applications,
}: ApplicationsTableProps) {
  return <DataTable columns={applicationColumns} data={applications} />;
}
