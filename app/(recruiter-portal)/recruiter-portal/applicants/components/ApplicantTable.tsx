"use client";

import { DataTable } from "@/components/dataTable/DataTable";
import type { Applicant } from "@/types/model";
import {
  applicantColumns
} from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/SuitableApplicantColumnConfig";

interface ApplicantsTableProps {
  applicants: Applicant[];
  onSelectionChange: (selectedItems: Applicant[]) => void;
}

export default function ApplicantsTable({ applicants, onSelectionChange }: ApplicantsTableProps) {
  return (
    <DataTable
      columns={applicantColumns}
      data={applicants}
      onSelectionChange={onSelectionChange}
    />
  );
}