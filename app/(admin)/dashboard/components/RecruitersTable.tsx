"use client";

import { Badge } from "@/components/ui/badge";
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
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export default function RecruitersTable() {
  const [recruiters] = useState([
    {
      id: 1,
      name: "Tech Corp Recruitment",
      email: "hr@techcorp.com",
      location: "Ho Chi Minh City",
      activeJobs: 12,
      status: "active",
      joinedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Design Studio HR",
      email: "recruitment@designstudio.com",
      location: "Hanoi",
      activeJobs: 5,
      status: "active",
      joinedDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Cloud Solutions Talent",
      email: "talent@cloudsolutions.com",
      location: "Da Nang",
      activeJobs: 8,
      status: "suspended",
      joinedDate: "2024-03-10",
    },
    {
      id: 4,
      name: "StartUp Inc Recruitment",
      email: "hr@startupinc.com",
      location: "Ho Chi Minh City",
      activeJobs: 3,
      status: "active",
      joinedDate: "2024-04-05",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recruiters.map((recruiter) => (
                <TableRow key={recruiter.id}>
                  <TableCell className="font-medium">
                    {recruiter.name}
                  </TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>{recruiter.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{recruiter.activeJobs} jobs</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        recruiter.status === "active"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        recruiter.status === "active" ? "bg-green-600" : ""
                      }
                    >
                      {recruiter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{recruiter.joinedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
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
      </CardContent>
    </Card>
  );
}
