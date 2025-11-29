"use client";

import { recruiterBlogColumns } from "@/app/(recruiter-portal)/recruiter-portal/blogs/components/BlogColumnConfig";
import { DataTable } from "@/components/dataTable/DataTable";
import { Blog } from "@/types/model";

interface BlogsTableProps {
  blogs: Blog[];
  onSelectionChange: (selectedItems: Blog[]) => void;
}

export default function BlogsTable({ blogs, onSelectionChange }: BlogsTableProps) {
  return <DataTable columns={recruiterBlogColumns} data={blogs} onSelectionChange={onSelectionChange} />;
}