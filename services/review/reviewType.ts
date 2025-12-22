import { IBackendRes } from '@/types/api';

export type CountReviewsByCompanyResponse = IBackendRes<Record<number, number>>;

export type AverageRatingsByCompanyResponse = IBackendRes<Record<number, number>>;
