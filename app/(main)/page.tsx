"use client";
import {
  FeaturedEmployers,
  FeaturedJobs,
  HeroSection,
  LatestBlogs
} from "@/app/(main)/components";
import { useFetchAvailableBlogsQuery } from "@/services/blog/blogApi";
import { useFetchJobsAvailableQuery } from "@/services/job/jobApi";
import { useFetchAvailableRecruitersQuery } from "@/services/recruiter/recruiterApi";
import { useCheckRecruitersFollowedQuery, useCheckSavedJobsQuery } from "@/services/user/userApi";
import { useMemo } from "react";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const {
    data: blogsData,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs
  } = useFetchAvailableBlogsQuery({
    page: 1,
    size: 3
  });
  const {
    data: jobsData,
    isLoading: isLoadingJobs,
    isError: isErrorJobs
  } = useFetchJobsAvailableQuery({
    page: 1,
    size: 3
  });
  const {
    data: recruitersData,
    isLoading: isLoadingRecruiters,
    isError: isErrorRecruiters
  } = useFetchAvailableRecruitersQuery({ page: 1, size: 3 });

  const jobs = useMemo(() => jobsData?.data?.result || [], [jobsData]);
  const recruiters = useMemo(() => recruitersData?.data?.result || [], [recruitersData]);
  const blogs = useMemo(() => blogsData?.data?.result || [], [blogsData]);

  const { data: checkSavedJobsData } =
    useCheckSavedJobsQuery(
      {
        jobIds: jobs.map((job) => job.jobId)
      },
      {
        skip: !jobs || jobs.length === 0 || !user || !isSignedIn
      }
    );

  const { data: checkFollowedData } =
    useCheckRecruitersFollowedQuery(
      {
        recruiterIds: recruiters.map((recruiter) => recruiter.accountId)
      },
      {
        skip: !recruiters || recruiters.length === 0 || !isSignedIn || !user
      }
    );

  const savedJobs = useMemo(() => checkSavedJobsData?.data || [], [checkSavedJobsData]);
  const followedRecruiters = useMemo(() => checkFollowedData?.data || [], [checkFollowedData]);

  console.log(user);

  return (
    <>
      <HeroSection />
      <FeaturedJobs
        jobs={jobs}
        isLoading={isLoadingJobs}
        isError={isErrorJobs}
        savedJobs={savedJobs}
      />
      <FeaturedEmployers
        recruiters={recruiters}
        isLoading={isLoadingRecruiters}
        isError={isErrorRecruiters}
        followedRecruiters={followedRecruiters}
      />
      <LatestBlogs
        blogs={blogs}
        isLoading={isLoadingBlogs}
        isError={isErrorBlogs}
      />
    </>
  );
}
