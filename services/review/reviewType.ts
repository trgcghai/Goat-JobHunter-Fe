import { IBackendRes } from '@/types/api';
import { Review } from '@/types/model';

export type CountReviewsByCompanyResponse = IBackendRes<Record<number, number>>;

export type AverageRatingsByCompanyResponse = IBackendRes<Record<number, number>>;

export type LatestReviewsResponse = IBackendRes<Review[]>;

export type CountAllReviewsResponse = IBackendRes<number>;
