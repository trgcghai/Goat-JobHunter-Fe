import { api } from '@/services/api';
import {
    CompanyIdRequest,
    FetchCompaniesRequest,
    FetchCompaniesResponse,
    FetchCompanyByIdResponse,
    FetchGroupedAddressesByCompanyResponse,
    FetchSkillsByCompanyResponse,
} from './companyType';
import { buildSpringQuery } from '@/utils/buildSpringQuery';

export const companyApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        fetchCompanies: builder.query<FetchCompaniesResponse, FetchCompaniesRequest>({
            query: (params) => {
                const { params: queryParams } = buildSpringQuery({
                    params,
                    filterFields: ['name'],
                    textSearchFields: ['name'],
                    defaultSort: 'createdAt,desc',
                    sortableFields: ['name', 'createdAt', 'updatedAt'],
                });

                return {
                    url: '/companies',
                    method: 'GET',
                    params: queryParams,
                };
            },
            providesTags: ['Company'],
        }),

        fetchAvailableCompanies: builder.query<FetchCompaniesResponse, FetchCompaniesRequest>({
            query: (params) => {
                const { params: queryParams } = buildSpringQuery({
                    params,
                    filterFields: ['name', 'verified'],
                    textSearchFields: ['name'],
                    nestedArrayFields: {
                        addresses: 'addresses.province',
                    },
                    defaultSort: 'createdAt,desc',
                    sortableFields: ['name', 'createdAt', 'updatedAt'],
                });

                return {
                    url: '/companies/available',
                    method: 'GET',
                    params: queryParams,
                };
            },
            providesTags: ['Company'],
        }),

        fetchCompanyById: builder.query<FetchCompanyByIdResponse, CompanyIdRequest>({
            query: (companyId) => ({
                url: `/companies/${companyId}`,
                method: 'GET',
            }),
            providesTags: ['Company'],
        }),

        fetchCompanyByName: builder.query<FetchCompanyByIdResponse, string>({
            query: (name) => ({
                url: `/companies/slug/${name}`,
                method: 'GET',
            }),
            providesTags: ['Company'],
        }),

        fetchGroupedAddressesByCompany: builder.query<FetchGroupedAddressesByCompanyResponse, CompanyIdRequest>({
            query: (companyId) => ({
                url: `/companies/${companyId}/group-addresses`,
                method: 'GET',
            }),
            providesTags: ['Company'],
        }),

        fetchSkillsByCompany: builder.query<FetchSkillsByCompanyResponse, CompanyIdRequest>({
            query: (companyId) => ({
                url: `/companies/${companyId}/jobs/skills`,
                method: 'GET',
            }),
            providesTags: ['Company'],
        }),
    }),
});

export const {
    useFetchCompaniesQuery,
    useFetchAvailableCompaniesQuery,
    useFetchCompanyByIdQuery,
    useFetchCompanyByNameQuery,
    useFetchGroupedAddressesByCompanyQuery,
    useFetchSkillsByCompanyQuery,
} = companyApi;
