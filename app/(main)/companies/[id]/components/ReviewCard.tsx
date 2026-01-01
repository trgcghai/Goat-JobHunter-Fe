import { Review } from '@/types/model';
import { formatDate } from '@/utils/formatDate';
import StarRating from './StarRating';
import { ChevronDown, ThumbsUp } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { RATING_TYPES } from '@/constants/constant';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="py-6 border-b border-dashed border-gray-300">
            <div className="text-[16px] text-gray-500 font-bold mb-1">{formatDate(review.createdAt || '')}</div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">{review.summary}</h3>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
                <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <div className="cursor-pointer inline-flex">
                            <StarRating rating={review.rating.overall} />
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-100" side="bottom" align="start">
                        <div className="space-y-2">
                            {RATING_TYPES.map(({ value, label }) => (
                                <div
                                    key={value}
                                    className="flex items-center justify-between text-[16px] border-b border-gray-300 border-dashed pb-1"
                                >
                                    <span className="text-gray-900">{label}</span>
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={review.rating[value as keyof typeof review.rating]} />
                                        <span className="font-semibold text-gray-900 min-w-[24px] text-right">
                                            {review.rating[value as keyof typeof review.rating]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HoverCardContent>
                </HoverCard>

                {review.recommended && (
                    <div className="flex items-center gap-1 text-green-600 text-[16px] font-medium">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Khuyến khích</span>
                    </div>
                )}
            </div>

            {review.experience && (
                <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-1 text-[16px]">Kinh nghiệm làm việc</h4>
                    <p className="text-gray-900 leading-relaxed text-[15px] font-medium">
                        {review.experience.split('\\n').map((line, index, array) => (
                            <span key={index}>
                                {line}
                                {index < array.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
            )}

            {review.suggestion && (
                <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-[16px]">Đề xuất cải thiện</h4>
                    <p className="text-gray-900 leading-relaxed text-[15px] font-medium">
                        {review.suggestion.split('\\n').map((line, index, array) => (
                            <span key={index}>
                                {line}
                                {index < array.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
}
