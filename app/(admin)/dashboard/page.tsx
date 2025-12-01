"use client";

import {
  useStatisticsApplicationByYearQuery,
  useStatisticsApplicationQuery,
  useStatisticsJobQuery,
  useStatisticsUserQuery
} from "@/services/dashboard/dashboardApi";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  ApplicationByYearChart,
  ApplicationSummaryChart,
  FilterApplication, FilterApplicationByYear,
  FilterJob,
  JobSummaryChart,
  UserSummaryChart
} from "@/app/(admin)/dashboard/components";
import { useApplicationByYearFilter, useApplicationFilter, useJobFilter } from "@/app/(admin)/dashboard/hooks";


export default function AdminDashboard() {
  const { filter: appFilter, setFilter: setAppFilter, getQueryParams: appQuery } = useApplicationFilter();
  const {
    filter: appYearFilter,
    setFilter: setAppYearFilter,
    getQueryParams: appYearQuery
  } = useApplicationByYearFilter({ year: new Date().getFullYear() });
  const { filter: jobFilter, setFilter: setJobFilter, getQueryParams: jobQuery } = useJobFilter();

  const { data: userData } = useStatisticsUserQuery();
  const { data: jobData } = useStatisticsJobQuery(jobQuery());
  const { data: applicationData } = useStatisticsApplicationQuery(appQuery());
  const { data: applicationByYearData } = useStatisticsApplicationByYearQuery({
    year: Number(appYearQuery().year) || 2025,
  });

  console.log({
    userData,
    jobData,
    applicationData,
    applicationByYearData
  });

  // Replace with UI layout; components already typed
  return (
    <div className="space-y-6">
      <section>
        <h2>Users</h2>
        {(!userData || !userData?.data) ?
          <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu thống kê người dùng."} />
          :
          <UserSummaryChart data={userData.data} />
        }
      </section>

      <section>
        <h2>Jobs</h2>
        <FilterJob filter={jobFilter} setFilter={setJobFilter} />
        {(!jobData || !jobData?.data) ?
          <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu thống kê việc làm."} />
          :
          <JobSummaryChart data={jobData?.data ?? null} />
        }
      </section>

      <section>
        <h2>Applications</h2>
        <FilterApplication filter={appFilter} setFilter={setAppFilter} />
        {(!applicationData || !applicationData?.data) ?
          <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu thống kê đơn ứng tuyển."} />
          :
          <ApplicationSummaryChart data={applicationData?.data ?? null} />
        }
      </section>

      <section>
        <h2>Applications by Year</h2>
        <FilterApplicationByYear filter={appYearFilter} setFilter={setAppYearFilter} recruiters={[]} />
        {(!applicationByYearData || !applicationByYearData?.data) ?
          <ErrorMessage message={"Có lỗi xảy ra khi tải dữ liệu thống kê đơn ứng tuyển."} />
          :
          <ApplicationByYearChart data={applicationByYearData?.data ?? null} />
        }
      </section>
    </div>
  );
}
