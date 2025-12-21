'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFetchGroupedAddressesByCompanyQuery } from '@/services/company/companyApi';
import { Company } from '@/types/model';
import { MapPin, Star, Briefcase, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CompanyCardProps {
    company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
    const [imageError, setImageError] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const hasValidLogo = company.logo && company.logo.trim() !== '';
    const hasValidCoverPhoto = company.coverPhoto && company.coverPhoto.trim() !== '';

    const { data: groupedAddresses } = useFetchGroupedAddressesByCompanyQuery(company.accountId);

    const cities = groupedAddresses?.data ? Object.keys(groupedAddresses.data)[0] : '';

    // Fake data
    const avgRating = 4.5;
    const totalJobs = 25;
    const totalReviews = 128;

    return (
        <Link href={`/companies/${company.accountId}`} className="h-full">
            <Card className="h-full flex flex-col overflow-visible hover:shadow-2xl transition-shadow duration-300 cursor-pointer p-0">
                <div className="relative h-36 bg-gradient-to-r from-blue-500 to-purple-600">
                    {hasValidCoverPhoto && !imageError ? (
                        <Image
                            src={company.coverPhoto}
                            alt={`${company.name} cover`}
                            className="w-full h-full object-cover"
                            width={400}
                            height={144}
                            onError={() => setImageError(true)}
                        />
                    ) : null}

                    <div className="absolute -bottom-14 left-4 right-4 flex items-end gap-3 justify-between">
                        {/* Logo */}
                        <div className="w-20 h-20 rounded-lg bg-white shadow-lg flex items-center justify-center overflow-hidden shrink-0 p-1">
                            {hasValidLogo && !logoError ? (
                                <Image
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="w-full h-full object-cover"
                                    width={80}
                                    height={80}
                                    onError={() => setLogoError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <span className="text-2xl font-bold text-muted-foreground">
                                        {company.name?.charAt(0).toUpperCase() || '?'}
                                    </span>
                                </div>
                            )}
                        </div>

                        <h3 className="font-bold text-lg text-foreground line-clamp-2 flex-1">{company.name}</h3>

                        <div className="flex items-center gap-1 text-sm font-semibold text-foreground shrink-0 pb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{avgRating}</span>
                        </div>
                    </div>
                </div>

                <CardContent className="flex-1 flex flex-col px-4 pb-4 pt-12">
                    {company.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-10">
                            {company.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground justify-between">
                        {cities && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">{cities}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 shrink-0" />
                            <span>{totalJobs} việc làm</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 shrink-0" />
                            <span>{totalReviews} đánh giá</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
