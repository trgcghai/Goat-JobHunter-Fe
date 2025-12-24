'use client';

import { useParams } from 'next/navigation';
import HeroSection from './components/HeroSection';
import useDetailCompany from './hooks/useDetailCompany';
import LoaderSpin from '@/components/common/LoaderSpin';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function DetailCompanyPage() {
    const params = useParams<{ id: string }>();
    const { company, citiesArray, totalJobs, isError, isLoading } = useDetailCompany(params.id);

    if (!company && (isLoading || isError === false)) {
        return <LoaderSpin />;
    }

    if (!company && isError) {
        return (
            <main className="min-h-screen bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <ErrorMessage message="Không thể tải thông tin công ty. Vui lòng thử lại sau." />
                </div>
            </main>
        );
    }

    return (
        <div>
            <HeroSection company={company!} totalJobs={totalJobs} citiesArray={citiesArray} />
        </div>
    );
}
