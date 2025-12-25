import { Badge } from '@/components/ui/badge';
import { Company } from '@/types/model';
import { Building2, Calendar, Clock, Flag, Globe, Briefcase, Pin, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';

interface AboutTabProps {
    company: Company;
    skills: Record<number, string>;
}

export default function AboutTab({ company, skills }: AboutTabProps) {
    const [activeLocationIndex, setActiveLocationIndex] = useState(0);

    const groupedAddresses = useMemo(() => {
        const groups: Record<string, typeof company.addresses> = {};
        company.addresses.forEach((address) => {
            if (!groups[address.province]) {
                groups[address.province] = [];
            }
            groups[address.province].push(address);
        });
        return groups;
    }, [company]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] w-full">
                <div className="p-5 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Thông tin chung</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-32">
                        <div className="flex items-start gap-4">
                            <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-gray-500 text-[16px] mb-1 font-bold whitespace-nowrap">
                                    Quy mô công ty
                                </span>
                                <span className="text-gray-900 font-bold text-[16px] whitespace-nowrap">
                                    {company.size}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-gray-500 text-[16px] mb-1 font-bold whitespace-nowrap">
                                    Lĩnh vực
                                </span>
                                <span className="text-gray-900 font-bold text-[16px] whitespace-nowrap">
                                    {company.industry}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Flag className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-gray-500 text-[16px] mb-1 font-bold whitespace-nowrap">
                                    Quốc gia
                                </span>
                                <span className="text-gray-900 font-bold text-[16px] whitespace-nowrap">
                                    {company.country}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-gray-500 text-[16px] mb-1 font-bold whitespace-nowrap">
                                    Thời gian làm việc
                                </span>
                                <span className="text-gray-900 font-bold text-[16px] whitespace-nowrap">
                                    {company.workingDays}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-gray-500 text-[16px] mb-1 font-bold whitespace-nowrap">
                                    Làm việc ngoài giờ
                                </span>
                                <span className="text-gray-900 font-bold text-[16px] whitespace-nowrap">
                                    {company.overtimePolicy}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 border-dashed">
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline font-medium text-[16px] w-full truncate"
                        >
                            <Globe className="w-4 h-4 shrink-0" />
                            <span className="truncate">{company.website}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-[22px] font-bold text-gray-900 leading-tight">Giới thiệu công ty</h2>
                </div>
                <div className="p-6">
                    <div className="prose prose-sm max-w-none text-gray-800 leading-7 text-[15px]">
                        {company.description ? (
                            <div dangerouslySetInnerHTML={{ __html: company.description }} />
                        ) : (
                            <p>Chưa có thông tin giới thiệu về công ty.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Chuyên môn của chúng tôi</h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(skills).map(([id, name]) => (
                            <Badge
                                key={id}
                                className="px-3 py-1.5 bg-white text-gray-700 text-[14px] font-medium border border-gray-300 hover:border-primary hover:text-primary transition-colors cursor-pointer rounded-2xl"
                            >
                                {name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Địa điểm</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {Object.entries(groupedAddresses).map(([province, addresses]) => (
                                <div key={province} className="space-y-2">
                                    <h3 className="font-bold text-[18px] text-gray-900 mb-2">{province}</h3>
                                    <div className="space-y-2">
                                        {addresses.map((address) => {
                                            const globalIndex = company.addresses.findIndex(
                                                (a) => a.addressId === address.addressId,
                                            );
                                            return (
                                                <div
                                                    key={address.addressId}
                                                    onClick={() => setActiveLocationIndex(globalIndex)}
                                                    className={`p-3 rounded border cursor-pointer transition-all duration-200 relative flex items-start gap-2 ${
                                                        activeLocationIndex === globalIndex
                                                            ? 'bg-primary-50 border-primary'
                                                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                    }`}
                                                >
                                                    <MapPin
                                                        className={`w-5 h-5 mt-1 shrink-0 ${
                                                            activeLocationIndex === globalIndex
                                                                ? 'text-primary'
                                                                : 'text-gray-400'
                                                        }`}
                                                    />
                                                    <p
                                                        className={`text-[16px] leading-relaxed font-medium ${
                                                            activeLocationIndex === globalIndex
                                                                ? 'text-primary'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {address.fullAddress}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="md:col-span-7 h-[300px] md:h-auto md:min-h-[400px] bg-gray-100 rounded border border-gray-200 overflow-hidden relative shadow-inner">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(company.addresses[activeLocationIndex].fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                                className="w-full h-full object-cover"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
