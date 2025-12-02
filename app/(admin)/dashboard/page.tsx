import { ApplicationsByYearChart, Top10BlogsChart, TotalStatisticsChart } from "@/app/(admin)/dashboard/components";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <TotalStatisticsChart />
      <ApplicationsByYearChart />
      <Top10BlogsChart />
    </div>
  );
}