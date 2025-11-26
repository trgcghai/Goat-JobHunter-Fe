"use client";

import { recruiterJobColumns } from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobColumnConfig";
import { DataTable } from "@/components/dataTable/DataTable";
import { Job } from "@/types/model";

interface JobsTableProps {
  jobs: Job[];
  onSelectionChange: (selectedItems: Job[]) => void;
}

export default function JobsTable({ jobs, onSelectionChange }: JobsTableProps) {
  return <DataTable columns={recruiterJobColumns} data={jobs} onSelectionChange={onSelectionChange} />;
}
