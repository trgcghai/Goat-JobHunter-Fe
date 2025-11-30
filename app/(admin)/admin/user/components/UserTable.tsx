"use client";

import type { User } from "@/types/model";
import { DataTable } from "@/components/dataTable/DataTable";
import { userColumns } from "@/app/(admin)/admin/user/components/UserColumnConfig";

interface UserTableProps {
  users: User[];
  onSelectionChange: (selectedItems: User[]) => void;
}

export function UserTable({
  users,
  onSelectionChange,
}: UserTableProps) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={userColumns}
        data={users}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}