"use client";

import ApplicationTable from "@/app/(main)/profile/components/ProfileApplication/ApplicationTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applications } from "@/constants/sample";
import { useMemo } from "react";

export function ProfileApplications() {
  // Filter applications by status
  const appliedJobs = useMemo(
    () =>
      applications.filter(
        (app) =>
          app.status !== "Withdrawn" &&
          app.status !== "Deleted" &&
          !app.isDeleted,
      ),
    [],
  );

  const savedJobs = useMemo(
    () =>
      applications.filter((app) => app.status === "Saved" && !app.isDeleted),
    [],
  );

  return (
    <Card className="p-6">
      <Tabs defaultValue="applied" className="w-full rounded-xl">
        <TabsList className="mb-6">
          <TabsTrigger className="rounded-lg" value="applied">
            Đã ứng tuyển
          </TabsTrigger>
          <TabsTrigger className="rounded-lg" value="saved">
            Đã lưu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applied">
          <ApplicationTable applications={appliedJobs} />
        </TabsContent>

        <TabsContent value="saved">
          <ApplicationTable applications={savedJobs} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
