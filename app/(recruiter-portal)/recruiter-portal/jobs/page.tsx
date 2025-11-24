"use client";

import JobsTable from "@/app/(recruiter-portal)/recruiter-portal/jobs/components/JobsTable";
import { useFetchJobsByCurrentRecruiterQuery } from "@/services/job/jobApi";

const RecruiterJobPage = () => {
  const { data } = useFetchJobsByCurrentRecruiterQuery({
    page: 1,
    size: 20,
  });

  console.log(data);

  return (
    <div>
      <JobsTable jobs={data?.data?.result || []} />
    </div>
  );
};

export default RecruiterJobPage;
