import { useState, useMemo } from 'react';
import { useFetchApplicationsByCurrentApplicantQuery } from '@/services/application/applicationApi';
import { useGetSavedJobsQuery } from '@/services/user/savedJobsApi';

export const useMyJob = () => {
  const [mainTab, setMainTab] = useState<'saved' | 'applied'>('applied');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch applications
  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useFetchApplicationsByCurrentApplicantQuery(
    {
      page: page - 1,
      size: pageSize,
    },
    {
      skip: mainTab !== 'applied',
    },
  );

  const applications = useMemo(() => applicationsData?.data?.result || [], [applicationsData?.data?.result]);

  const totalPagesApplications = useMemo(
    () => applicationsData?.data?.meta?.pages || 1,
    [applicationsData?.data?.meta?.pages],
  );

  const totalElementsApplications = useMemo(
    () => applicationsData?.data?.meta?.total || 0,
    [applicationsData?.data?.meta?.total],
  );

  // Fetch saved jobs
  const {
    data: savedJobsData,
    isLoading: isLoadingSavedJobs,
    isError: isErrorSavedJobs,
  } = useGetSavedJobsQuery(undefined, {
    skip: mainTab !== 'saved',
  });

  const savedJobs = useMemo(() => savedJobsData?.data?.result || [], [savedJobsData?.data?.result]);

  const totalPagesSavedJobs = useMemo(() => savedJobsData?.data?.meta?.pages || 1, [savedJobsData?.data?.meta?.pages]);

  const totalElementsSavedJobs = useMemo(
    () => savedJobsData?.data?.meta?.total || 0,
    [savedJobsData?.data?.meta?.total],
  );

  // Handlers
  const handleMainTabChange = (tab: string) => {
    setMainTab(tab as 'saved' | 'applied');
    setPage(1);
  };

  return {
    // State
    mainTab,
    page,
    pageSize,

    // Applications data
    applications,
    isLoadingApplications,
    isErrorApplications,
    totalPagesApplications,
    totalElementsApplications,

    // Saved jobs data
    savedJobs,
    isLoadingSavedJobs,
    isErrorSavedJobs,
    totalPagesSavedJobs,
    totalElementsSavedJobs,

    // Handlers
    handleMainTabChange,
    setPage,
  };
};
