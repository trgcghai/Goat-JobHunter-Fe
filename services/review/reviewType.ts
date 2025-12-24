import { IBackendRes } from '@/types/api';
import { Review } from '@/types/model';

export type CountReviewsByCompanyResponse = IBackendRes<Record<number, number>>;

export type AverageRatingsByCompanyResponse = IBackendRes<Record<number, number>>;

export type LatestReviewsResponse = IBackendRes<Review[]>;

export type CountAllReviewsResponse = IBackendRes<number>;

export type RatingSummaryByCompanyResponse = IBackendRes<{
    ratings: Record<string, { average: number; distribution: Record<number, number> }>;
}>;
