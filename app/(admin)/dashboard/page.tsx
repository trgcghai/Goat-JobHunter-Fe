"use client";

import {
  BlogsTable,
  JobsTable,
  PermissionsTable,
  RecruitersTable,
  RolesTable,
} from "@/app/(admin)/dashboard/components";
import AdminSidebar from "@/app/(admin)/dashboard/components/AdminSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, Lock, Shield, Users } from "lucide-react";
import { useState } from "react";

export interface AdminTab {
  value: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  component: React.ReactNode;
}

const AdminTabs: AdminTab[] = [
  {
    value: "jobs",
    label: "Jobs",
    icon: <Briefcase className="w-4 h-4" />,
    title: "Job Management",
    description: "Manage job postings and applications",
    component: <JobsTable />,
  },
  {
    value: "blogs",
    label: "Blogs",
    icon: <FileText className="w-4 h-4" />,
    title: "Blog Management",
    description: "Manage blog posts and comments",
    component: <BlogsTable />,
  },
  {
    value: "users",
    label: "Users",
    icon: <Users className="w-4 h-4" />,
    title: "User Management",
    description: "Manage recruiter accounts and permissions",
    component: <RecruitersTable />,
  },
  {
    value: "roles",
    label: "Roles",
    icon: <Shield className="w-4 h-4" />,
    title: "Role Management",
    description: "Create and manage user roles",
    component: <RolesTable />,
  },
  {
    value: "permissions",
    label: "Permissions",
    icon: <Lock className="w-4 h-4" />,
    title: "Permission Management",
    description: "Manage user permissions",
    component: <PermissionsTable />,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={AdminTabs}
      />

      <main className="flex-1 ml-64 p-6">
        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="hidden">
              {AdminTabs.map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.value + "_trigger"}
                    value={tab.value}
                    className="flex items-center gap-2"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {AdminTabs.map((tab) => {
              return (
                <TabsContent
                  value={tab.value}
                  key={tab.value + "_content"}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {tab.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                  {tab.component}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
