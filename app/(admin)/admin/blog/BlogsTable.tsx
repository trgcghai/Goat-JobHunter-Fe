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
import { Check, Eye, X } from "lucide-react";
import { useState } from "react";

export default function BlogsTable() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Top Skills for 2025",
      author: "John Doe",
      status: "pending",
      submittedDate: "2024-11-04",
      draft: false,
    },
    {
      id: 2,
      title: "Career Development Guide",
      author: "Jane Smith",
      status: "approved",
      submittedDate: "2024-11-02",
      draft: false,
    },
    {
      id: 3,
      title: "Interview Tips for Success",
      author: "Mike Johnson",
      status: "pending",
      submittedDate: "2024-11-03",
      draft: false,
    },
    {
      id: 4,
      title: "Remote Work Best Practices",
      author: "Sarah Williams",
      status: "rejected",
      submittedDate: "2024-10-30",
      draft: false,
    },
  ]);

  const handleApprove = (id: number) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, status: "approved" } : blog,
      ),
    );
  };

  const handleReject = (id: number) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, status: "rejected" } : blog,
      ),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>{blog.submittedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        blog.status === "approved"
                          ? "default"
                          : blog.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        blog.status === "approved"
                          ? "bg-green-600"
                          : blog.status === "pending"
                            ? "bg-yellow-600"
                            : ""
                      }
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      {blog.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(blog.id)}
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-red-600 hover:text-red-700"
                            onClick={() => handleReject(blog.id)}
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                        </>
                      )}
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
