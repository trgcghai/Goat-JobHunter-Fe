'use client';

import { useParams } from 'next/navigation';
import useDetailCompany from './hooks/useDetailCompany';
import LoaderSpin from '@/components/common/LoaderSpin';
import ErrorMessage from '@/components/common/ErrorMessage';
import { HeroSection } from './components';
import { useMemo, useState } from 'react';
import { AboutTab, BlogTab, ReviewTab } from './components/tabs';

export default function DetailCompanyPage() {
    const params = useParams<{ id: string }>();
    const { company, skills, citiesArray, totalJobs, totalReviews, isError, isLoading } = useDetailCompany(params.id);

    const tabs: Array<{ id: string; label: string; count: number | null }> = useMemo(
        () => [
            { id: 'about', label: 'Giới thiệu', count: null },
            { id: 'reviews', label: 'Đánh giá', count: totalReviews },
            { id: 'blogs', label: 'Bài viết', count: null },
        ],
        [totalReviews],
    );

    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

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
        <div className="flex-1">
            <HeroSection company={company!} totalJobs={totalJobs} citiesArray={citiesArray} />
            <section className="border-b border-border p-6">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex-1 min-w-0">
                        <div className="sticky top-16 z-40 bg-[#f7f7f7] mb-6">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <div className="flex gap-8 px-6 overflow-x-auto no-scrollbar">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 border-b-[3px] font-bold text-[16px] whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                                                activeTab === tab.id
                                                    ? 'border-primary text-primary'
                                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-900'
                                            }`}
                                        >
                                            {tab.label}
                                            {tab.count !== null && (
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-lg font-bold leading-none ${
                                                        activeTab === tab.id
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                    }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {activeTab === 'about' && <AboutTab company={company!} skills={skills} />}
                        {activeTab === 'reviews' && <ReviewTab />}
                        {activeTab === 'blogs' && <BlogTab />}
                    </div>

                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-white rounded border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
                            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
                                <h3 className="font-bold text-gray-900 text-lg">{totalJobs} Việc làm</h3>
                                <span className="text-xs text-gray-500">Cuộn để xem</span>
                            </div>
                            <div className="p-3 overflow-y-auto custom-scrollbar space-y-3">okkkk</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
