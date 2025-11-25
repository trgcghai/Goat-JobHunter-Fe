"use client";
import { useFetchApplicationsByRecruiterQuery } from "@/services/application/applicationApi";

const ApplicationsManagement = () => {
  const { data } = useFetchApplicationsByRecruiterQuery({
    page: 1,
    size: 10,
  });

  console.log(data);

  return <div>ApplicationsManagement</div>;
};

export default ApplicationsManagement;
