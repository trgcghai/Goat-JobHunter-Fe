"use client";

import {
  BlogsTable,
  JobsTable,
  PermissionsTable,
  RecruitersTable,
  RolesTable,
  UsersTable,
} from "@/app/(admin)/dashboard/components";
import AdminSidebar from "@/app/(admin)/dashboard/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, Lock, Shield, Users } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-64 p-6">
        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="hidden">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blogs
              </TabsTrigger>
              <TabsTrigger
                value="recruiters"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Recruiters
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Roles
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Permissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Job Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    View all posted jobs
                  </p>
                </div>
              </div>
              <JobsTable />
            </TabsContent>

            <TabsContent value="blogs" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Blog Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Approve or reject blog submissions
                  </p>
                </div>
              </div>
              <BlogsTable />
            </TabsContent>

            <TabsContent value="recruiters" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Recruiter Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Manage recruiter accounts and permissions
                  </p>
                </div>
              </div>
              <RecruitersTable />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    User Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Manage user accounts and status
                  </p>
                </div>
              </div>
              <UsersTable />
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Role Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Create and manage user roles
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Add Role
                </Button>
              </div>
              <RolesTable />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Permission Management
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Manage system permissions and access control
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Add Permission
                </Button>
              </div>
              <PermissionsTable />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
