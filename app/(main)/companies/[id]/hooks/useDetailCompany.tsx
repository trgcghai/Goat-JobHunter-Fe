import {
    useFetchCompanyByNameQuery,
    useFetchGroupedAddressesByCompanyQuery,
    useFetchSkillsByCompanyQuery,
} from '@/services/company/companyApi';
import { useCountJobsByCompanyQuery } from '@/services/job/jobApi';
import {
    useCalculateRecommendedPercentageByCompanyQuery,
    useCountReviewsByCompanyQuery,
    useGetRatingByCompanyQuery,
} from '@/services/review/reviewApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

const useDetailCompany = (name: string) => {
    const { data: company, isError, isLoading } = useFetchCompanyByNameQuery(name);
    const companyId = company?.data?.accountId;

    const { data: groupedAddresses } = useFetchGroupedAddressesByCompanyQuery(companyId ?? skipToken);
    const { data: countJobs } = useCountJobsByCompanyQuery(undefined, {
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

    const citiesArray = useMemo(
        () => (groupedAddresses?.data ? Object.keys(groupedAddresses.data) : []),
        [groupedAddresses],
    );

    return {
        company: company?.data,
        skills: skillsResponse?.data || [],
        citiesArray,
        totalJobs: company?.data?.accountId ? countJobs?.data?.[company?.data?.accountId] || 0 : 0,
        totalReviews: company?.data?.accountId ? countReviews?.data?.[company?.data?.accountId] || 0 : 0,
        ratingSummary: ratingByCompany?.data?.ratings || {},
        recommendedPercentage: recommendedPercentageResponse?.data,

        isError,
        isLoading,
    };
};

export default useDetailCompany;
