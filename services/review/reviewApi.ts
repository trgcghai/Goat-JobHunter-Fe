import { api } from '../api';
import {
    AverageRatingsByCompanyResponse,
    CountAllReviewsResponse,
    CountReviewsByCompanyResponse,
    LatestReviewsResponse,
    RatingSummaryByCompanyResponse,
} from './reviewType';
import { CompanyIdRequest } from '../company/companyType';

export const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        latestReviews: builder.query<LatestReviewsResponse, void>({
            query: () => ({
                url: `/reviews/latest`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),

        countReviewsByCompany: builder.query<CountReviewsByCompanyResponse, void>({
            query: () => ({
                url: `/reviews/companies/count`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),

        averageRatingsByCompany: builder.query<AverageRatingsByCompanyResponse, void>({
            query: () => ({
                url: `/reviews/companies/ratings/average`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),

        countAllReviews: builder.query<CountAllReviewsResponse, void>({
            query: () => ({
                url: `/reviews/count`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),

        getRatingByCompany: builder.query<RatingSummaryByCompanyResponse, CompanyIdRequest>({
            query: (companyId) => ({
                url: `/reviews/companies/${companyId}/ratings/summary`,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),
    }),
});

export const {
    useLatestReviewsQuery,
    useCountReviewsByCompanyQuery,
    useAverageRatingsByCompanyQuery,
    useCountAllReviewsQuery,
} = reviewApi;
