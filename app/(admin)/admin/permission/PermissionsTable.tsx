"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Shield, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PermissionsTable() {
  const [permissions] = useState([
    {
      id: 1,
      name: "view_jobs",
      description: "View all job listings",
      category: "Jobs",
    },
    {
      id: 2,
      name: "create_jobs",
      description: "Create new job postings",
      category: "Jobs",
    },
    {
      id: 3,
      name: "edit_jobs",
      description: "Edit existing job postings",
      category: "Jobs",
    },
    {
      id: 4,
      name: "delete_jobs",
      description: "Delete job postings",
      category: "Jobs",
    },
    {
      id: 5,
      name: "approve_blogs",
      description: "Approve blog submissions",
      category: "Blogs",
    },
    {
      id: 6,
      name: "reject_blogs",
      description: "Reject blog submissions",
      category: "Blogs",
    },
    {
      id: 7,
      name: "manage_users",
      description: "Manage user accounts",
      category: "Users",
    },
    {
      id: 8,
      name: "manage_recruiters",
      description: "Manage recruiter accounts",
      category: "Recruiters",
    },
  ]);

  const categories = [...new Set(permissions.map((p) => p.category))];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryPerms = permissions.filter(
              (p) => p.category === category,
            );
            return (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {category}
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Permission Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryPerms.map((perm) => (
                        <TableRow key={perm.id}>
                          <TableCell className="font-mono font-semibold text-sm">
                            {perm.name}
                          </TableCell>
                          <TableCell>{perm.description}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
