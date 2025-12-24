import { useFetchCompanyByNameQuery, useFetchGroupedAddressesByCompanyQuery } from '@/services/company/companyApi';
import { useCountJobsByCompanyQuery } from '@/services/job/jobApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

const useDetailCompany = (name: string) => {
    const { data: company, isError, isLoading } = useFetchCompanyByNameQuery(name);

    const companyId = company?.data?.accountId;

    const { data: groupedAddresses } = useFetchGroupedAddressesByCompanyQuery(companyId ?? skipToken);

    const { data: countJobs } = useCountJobsByCompanyQuery(undefined, {
        skip: !companyId,
    });

    const citiesArray = useMemo(
        () => (groupedAddresses?.data ? Object.keys(groupedAddresses.data) : []),
        [groupedAddresses],
    );

    return {
        company: company?.data,
        citiesArray,
        totalJobs: company?.data?.accountId ? countJobs?.data?.[company?.data?.accountId] || 0 : 0,

        isError,
        isLoading,
    };
};

export default useDetailCompany;
