import { Option } from "@/components/ui/MultipleSelector";
import { Level, ReactionType, WorkingType } from "@/types/enum";
import { Clover, Heart, Lightbulb, PartyPopper, Smile, ThumbsUp } from "lucide-react";
import { capitalize } from "lodash";
import { Reaction } from "@/types/model";

export const LEVEL_OPTIONS = [
    { value: Level.INTERN, label: 'Intern' },
    { value: Level.FRESHER, label: 'Fresher' },
    { value: Level.JUNIOR, label: 'Junior' },
    { value: Level.MIDDLE, label: 'Middle' },
    { value: Level.SENIOR, label: 'Senior' },
];

export const WORKING_TYPE_OPTIONS = [
    { value: WorkingType.FULLTIME, label: 'Full time' },
    { value: WorkingType.PARTTIME, label: 'Part time' },
    { value: WorkingType.ONLINE, label: 'Online' },
    { value: WorkingType.OFFLINE, label: 'Offline' },
];

export const ROLE_LIST = [
    { label: 'Admin', value: 'SUPER_ADMIN' },
    { label: 'Nhà tuyển dụng', value: 'HR' },
    { label: 'Ứng viên', value: 'APPLICANT' },
];

export const LOCATION_OPTIONS: Option[] = [
    { label: 'Hà Nội', value: 'Hà Nội' },
    { label: 'Hải Phòng', value: 'Hải Phòng' },
    { label: 'Đà Nẵng', value: 'Đà Nẵng' },
    { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
    { label: 'Cần Thơ', value: 'Cần Thơ' },
    { label: 'Thừa Thiên Huế', value: 'Thừa Thiên Huế' },

    { label: 'Tuyên Quang', value: 'Tuyên Quang' },
    { label: 'Lào Cai', value: 'Lào Cai' },
    { label: 'Thái Nguyên', value: 'Thái Nguyên' },
    { label: 'Phú Thọ', value: 'Phú Thọ' },
    { label: 'Bắc Ninh', value: 'Bắc Ninh' },
    { label: 'Hưng Yên', value: 'Hưng Yên' },

    { label: 'Ninh Bình', value: 'Ninh Bình' },
    { label: 'Quảng Trị', value: 'Quảng Trị' },
    { label: 'Quảng Ngãi', value: 'Quảng Ngãi' },
    { label: 'Gia Lai', value: 'Gia Lai' },
    { label: 'Khánh Hòa', value: 'Khánh Hòa' },
    { label: 'Lâm Đồng', value: 'Lâm Đồng' },

    { label: 'Đắk Lắk', value: 'Đắk Lắk' },
    { label: 'Đồng Nai', value: 'Đồng Nai' },
    { label: 'Tây Ninh', value: 'Tây Ninh' },
    { label: 'Vĩnh Long', value: 'Vĩnh Long' },
    { label: 'Đồng Tháp', value: 'Đồng Tháp' },
    { label: 'Cà Mau', value: 'Cà Mau' },

    { label: 'An Giang', value: 'An Giang' },
    { label: 'Lai Châu', value: 'Lai Châu' },
    { label: 'Điện Biên', value: 'Điện Biên' },
    { label: 'Sơn La', value: 'Sơn La' },
    { label: 'Lạng Sơn', value: 'Lạng Sơn' },
    { label: 'Quảng Ninh', value: 'Quảng Ninh' },

    { label: 'Thanh Hóa', value: 'Thanh Hóa' },
    { label: 'Nghệ An', value: 'Nghệ An' },
    { label: 'Hà Tĩnh', value: 'Hà Tĩnh' },
    { label: 'Cao Bằng', value: 'Cao Bằng' },
];

export const JOBFILTER_CONFIG = {
    location: {
        option: LOCATION_OPTIONS,
        maxSelected: 3,
        maxSelectedMessage: 'Bạn chỉ có thể chọn tối đa 3 địa điểm',
    },
    level: {
        option: LEVEL_OPTIONS,
        maxSelected: LEVEL_OPTIONS.length - 1,
        maxSelectedMessage: `Bạn chỉ có thể chọn tối đa ${LEVEL_OPTIONS.length - 1} cấp độ`,
    },
    workingType: {
        option: WORKING_TYPE_OPTIONS,
        maxSelected: WORKING_TYPE_OPTIONS.length - 1,
        maxSelectedMessage: `Bạn chỉ có thể chọn tối đa ${WORKING_TYPE_OPTIONS.length - 1} hình thức làm việc`,
    },
};

export const RECRUITERFILTER_CONFIG = {
    location: {
        option: LOCATION_OPTIONS,
        maxSelected: 1,
        maxSelectedMessage: 'Bạn chỉ có thể chọn tối đa 1 địa điểm',
    },
};

export const PAGINATION_PAGESIZE = [10, 20, 30, 40, 50];

export const METHOD_OPTIONS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export enum ROLE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    HR = 'HR',
    APPLICANT = 'APPLICANT',
}

export const MAX_IMAGE_UPLOAD = 90;

export const MAX_DISPLAYED_IMAGES = 4;

export const reactions: Reaction[] = [
    {
        id: ReactionType.LIKE,
        icon: ThumbsUp,
        label: capitalize(ReactionType.LIKE),
        color: '#0A66C2',
        hoverColor: '#004182',
    },
    {
        id: ReactionType.CELEBRATE,
        icon: PartyPopper,
        label: capitalize(ReactionType.CELEBRATE),
        color: '#6DAF3D',
        hoverColor: '#5A9130',
    },
    {
        id: ReactionType.SUPPORT,
        icon: Clover,
        label: capitalize(ReactionType.SUPPORT),
        color: '#DF704D',
        hoverColor: '#C95A3A',
    },
    {
        id: ReactionType.LOVE,
        icon: Heart,
        label: capitalize(ReactionType.LOVE),
        color: '#DF704D',
        hoverColor: '#C95A3A',
    },
    {
        id: ReactionType.INSIGHTFUL,
        icon: Lightbulb,
        label: capitalize(ReactionType.INSIGHTFUL),
        color: '#F5C344',
        hoverColor: '#D9AB2A',
    },
    {
        id: ReactionType.FUNNY,
        icon: Smile,
        label: capitalize(ReactionType.FUNNY),
        color: '#F5C344',
        hoverColor: '#D9AB2A',
    },
];

export const reactionLabelMap: Record<ReactionType, string> = {
    [ReactionType.LIKE]: 'Thích',
    [ReactionType.CELEBRATE]: 'Chúc mừng',
    [ReactionType.SUPPORT]: 'Ủng hộ',
    [ReactionType.LOVE]: 'Yêu',
    [ReactionType.INSIGHTFUL]: 'Sâu sắc',
    [ReactionType.FUNNY]: 'Hài hước',
};

export const COMPANY_SIZE_OPTIONS = [
    { value: 'STARTUP', label: 'Khởi nghiệp' },
    { value: 'SMALL', label: 'Nhỏ' },
    { value: 'MEDIUM', label: 'Vừa' },
    { value: 'LARGE', label: 'Lớn' },
    { value: 'ENTERPRISE', label: 'Tập đoàn' },
];

export const RATING_TYPES = [
    { value: 'salaryBenefits', label: 'Lương thưởng & phúc lợi' },
    { value: 'trainingLearning', label: 'Đào tạo & học hỏi' },
    { value: 'managementCaresAboutMe', label: 'Sự quan tâm đến nhân viên' },
    { value: 'cultureFun', label: 'Văn hóa công ty' },
    { value: 'officeWorkspace', label: 'Văn phòng làm việc' },
];
