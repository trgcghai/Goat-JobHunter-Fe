"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ExternalLink } from "lucide-react";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  position: string;
  salary: string;
  status: "applied" | "saved";
  appliedDate?: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "Tech Corp",
    position: "Senior Developer",
    salary: "25-35 triệu VNĐ",
    status: "applied",
    appliedDate: "5 ngày trước",
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "Startup XYZ",
    position: "Developer",
    salary: "20-30 triệu VNĐ",
    status: "applied",
    appliedDate: "10 ngày trước",
  },
  {
    id: 3,
    jobTitle: "Backend Engineer",
    company: "Digital Innovation",
    position: "Engineer",
    salary: "22-32 triệu VNĐ",
    status: "applied",
    appliedDate: "15 ngày trước",
  },
  {
    id: 4,
    jobTitle: "React Developer",
    company: "Web Solutions",
    position: "Developer",
    salary: "18-28 triệu VNĐ",
    status: "saved",
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    company: "Cloud Systems",
    position: "Engineer",
    salary: "25-35 triệu VNĐ",
    status: "saved",
  },
];

export function ProfileApplications() {
  const appliedJobs = mockApplications.filter(
    (job) => job.status === "applied",
  );
  const savedJobs = mockApplications.filter((job) => job.status === "saved");

  const JobCard = ({ job }: { job: Application }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
          <p className="text-sm text-foreground mt-2 font-medium">
            {job.salary}
          </p>
          {job.status === "applied" && job.appliedDate && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Ứng tuyển {job.appliedDate}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Xem Chi Tiết</span>
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="applied" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="applied">
            Đã Ứng Tuyển ({appliedJobs.length})
          </TabsTrigger>
          <TabsTrigger value="saved">Đã Lưu ({savedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="space-y-4">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Bạn chưa ứng tuyển công việc nào
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Bạn chưa lưu công việc nào
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
