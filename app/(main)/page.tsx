"use client";
import {
  FeaturedEmployers,
  FeaturedJobs,
  HeroSection,
  LatestBlogs,
} from "@/app/(main)/components";
import { useFetchBlogsQuery } from "@/services/blog/blogApi";
import { useFetchJobsQuery } from "@/services/job/jobApi";
import { useFetchRecruitersQuery } from "@/services/recruiter/recruiterApi";

export default function Home() {
  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useFetchBlogsQuery({
    page: 1,
    size: 3,
  });
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
  } = useFetchJobsQuery({
    page: 1,
    size: 3,
  });
  const {
    data: recruiters,
    isLoading: isLoadingRecruiters,
    isError: isErrorRecruiters,
  } = useFetchRecruitersQuery({ page: 1, size: 3 });

  return (
    <>
      <HeroSection />
      <FeaturedJobs
        jobs={jobs?.data?.result || []}
        isLoading={isLoadingJobs}
        isError={isErrorJobs}
      />
      <FeaturedEmployers
        recruiters={recruiters?.data?.result || []}
        isLoading={isLoadingRecruiters}
        isError={isErrorRecruiters}
      />
      <LatestBlogs
        blogs={blogs?.data?.result || []}
        isLoading={isLoadingBlogs}
        isError={isErrorBlogs}
      />
    </>
  );
}
