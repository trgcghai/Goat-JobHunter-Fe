import { useUser } from '@/hooks/useUser';
import {
    useFetchAvailableJobsByCompanyQuery,
    useFetchCompanyByNameQuery,
    useFetchGroupedAddressesByCompanyQuery,
    useFetchSkillsByCompanyQuery,
} from '@/services/company/companyApi';
import { useCountAvailableJobsByCompanyQuery } from '@/services/job/jobApi';
import {
    useCalculateRecommendedPercentageByCompanyQuery,
    useCountReviewsByCompanyQuery,
    useGetRatingByCompanyQuery,
} from '@/services/review/reviewApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

const useDetailCompany = (name: string) => {
    const { user, isSignedIn } = useUser();
    const { data: company, isError, isLoading } = useFetchCompanyByNameQuery(name);
    const companyId = company?.data?.accountId;

    const { data: groupedAddresses } = useFetchGroupedAddressesByCompanyQuery(companyId ?? skipToken);
    const { data: countJobs } = useCountAvailableJobsByCompanyQuery(undefined, {
        skip: !companyId,
    });
    const { data: countReviews } = useCountReviewsByCompanyQuery(undefined, {
        skip: !companyId,
    });
    const { data: skillsResponse } = useFetchSkillsByCompanyQuery(companyId ?? skipToken);
    const { data: ratingByCompany } = useGetRatingByCompanyQuery(companyId ?? skipToken);
    const { data: recommendedPercentageResponse } = useCalculateRecommendedPercentageByCompanyQuery(
        companyId ?? skipToken,
    );
    const {
        data: jobsResponse,
        isLoading: isLoadingJobs,
        isError: isErrorJobs,
    } = useFetchAvailableJobsByCompanyQuery(
        { companyId: companyId ?? 0 },
        {
            skip: !companyId,
        },
    );

    const citiesArray = useMemo(
        () => (groupedAddresses?.data ? Object.keys(groupedAddresses.data) : []),
        [groupedAddresses],
    );

    return {
        user,
        isSignedIn,

        company: company?.data,
        skills: skillsResponse?.data || [],
        jobs: jobsResponse?.data || [],
        citiesArray,
        totalJobs: company?.data?.accountId ? countJobs?.data?.[company?.data?.accountId] || 0 : 0,
        totalReviews: company?.data?.accountId ? countReviews?.data?.[company?.data?.accountId] || 0 : 0,
        ratingSummary: ratingByCompany?.data?.ratings || {},
        recommendedPercentage: recommendedPercentageResponse?.data,

        isError,
        isLoading,
        isLoadingJobs,
        isErrorJobs,
    };
};

export default useDetailCompany;
