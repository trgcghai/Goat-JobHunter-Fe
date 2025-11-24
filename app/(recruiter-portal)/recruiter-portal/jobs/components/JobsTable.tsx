"use client";

import { recruiterJobColumns } from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobColumnConfig";
import { DataTable } from "@/components/dataTable/DataTable";
import { Job } from "@/types/model";

interface JobsTableProps {
  jobs: Job[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  return <DataTable columns={recruiterJobColumns} data={jobs} />;
}
