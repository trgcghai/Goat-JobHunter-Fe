"use client";

import ApplicationTable from "@/app/(main)/profile/components/ProfileApplication/ApplicationTable";
import JobTable from "@/app/(main)/profile/components/ProfileApplication/JobTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileApplications() {
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
          <ApplicationTable />
        </TabsContent>

        <TabsContent value="saved">
          <JobTable />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
