import { api } from '../api';
import { AverageRatingsByCompanyResponse, CountReviewsByCompanyResponse } from './reviewType';

export const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useCountReviewsByCompanyQuery, useAverageRatingsByCompanyQuery } = reviewApi;
