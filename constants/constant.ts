import { Option } from "@/components/ui/MultipleSelector";
import { Level, WorkingType } from "@/types/enum";

export const SKILL_OPTIONS: Option[] = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "AWS", label: "AWS" },
  { value: "SQL", label: "SQL" },
  { value: "Figma", label: "Figma" },
  { value: "UI Design", label: "UI Design" },
  { value: "Mobile UI", label: "Mobile UI" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Docker", label: "Docker" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Flutter", label: "Flutter" },
  { value: "React Native", label: "React Native" },
];

export const EMPLOYER_OPTIONS: Option[] = [
  { value: "TechCorp Vietnam", label: "TechCorp Vietnam" },
  { value: "StartupXYZ", label: "StartupXYZ" },
  { value: "DesignStudio", label: "DesignStudio" },
  { value: "CloudServices Inc", label: "CloudServices Inc" },
  { value: "DataCorp", label: "DataCorp" },
  { value: "AppStudio", label: "AppStudio" },
  { value: "InfraTech", label: "InfraTech" },
];

export const LEVEL_OPTIONS = [
  { value: Level.INTERN, label: "Intern" },
  { value: Level.FRESHER, label: "Fresher" },
  { value: Level.JUNIOR, label: "Junior" }, // Value phải là "JUNIOR", không phải "Junior"
  { value: Level.MIDDLE, label: "Middle" },
  { value: Level.SENIOR, label: "Senior" }, // Thêm nếu backend có
];

export const WORKING_TYPE_OPTIONS = [
  { value: WorkingType.FULLTIME, label: "Full time" },
  { value: WorkingType.PARTTIME, label: "Part time" },
  { value: WorkingType.ONLINE, label: "Online" },
  { value: WorkingType.OFFLINE, label: "Offline" },
];

export const ROLE_LIST = [
  { label: "Admin", value: "SUPER_ADMIN" },
  { label: "Nhà tuyển dụng", value: "HR" },
  { label: "Ứng viên", value: "APPLICANT" },
];

export const LOCATION_OPTIONS: Option[] = [
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Hải Phòng", value: "Hải Phòng" },
  { label: "Huế", value: "Huế" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Cần Thơ", value: "Cần Thơ" },
  { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Lai Châu", value: "Lai Châu" },
  { label: "Điện Biên", value: "Điện Biên" },
  { label: "Sơn La", value: "Sơn La" },
  { label: "Lạng Sơn", value: "Lạng Sơn" },
  { label: "Cao Bằng", value: "Cao Bằng" },
  { label: "Tuyên Quang", value: "Tuyên Quang" },
  { label: "Lào Cai", value: "Lào Cai" },
  { label: "Thái Nguyên", value: "Thái Nguyên" },
  { label: "Phú Thọ", value: "Phú Thọ" },
  { label: "Bắc Ninh", value: "Bắc Ninh" },
  { label: "Hưng Yên", value: "Hưng Yên" },
  { label: "Ninh Bình", value: "Ninh Bình" },
  { label: "Quảng Ninh", value: "Quảng Ninh" },
  { label: "Thanh Hóa", value: "Thanh Hóa" },
  { label: "Nghệ An", value: "Nghệ An" },
  { label: "Hà Tĩnh", value: "Hà Tĩnh" },
  { label: "Quảng Trị", value: "Quảng Trị" },
  { label: "Quảng Ngãi", value: "Quảng Ngãi" },
  { label: "Gia Lai", value: "Gia Lai" },
  { label: "Khánh Hòa", value: "Khánh Hòa" },
  { label: "Lâm Đồng", value: "Lâm Đồng" },
  { label: "Đắk Lắk", value: "Đắk Lắk" },
  { label: "Đồng Nai", value: "Đồng Nai" },
  { label: "Tây Ninh", value: "Tây Ninh" },
  { label: "Vĩnh Long", value: "Vĩnh Long" },
  { label: "Đồng Tháp", value: "Đồng Tháp" },
  { label: "Cà Mau", value: "Cà Mau" },
  { label: "An Giang", value: "An Giang" },
];

export const EDUCATION_LIST = [
  { label: "Cao đẳng", value: "COLLEGE" },
  { label: "Đại học", value: "UNIVERSITY" },
  { label: "THPT", value: "SCHOOL" },
  { label: "Kỹ sư", value: "ENGINEER" },
];

export const JOBFILTER_CONFIG = {
  skill: {
    option: SKILL_OPTIONS,
    maxSelected: 4,
    maxSelectedMessage: "Bạn chỉ có thể chọn tối đa 4 kỹ năng",
  },
  location: {
    option: LOCATION_OPTIONS,
    maxSelected: 1,
    maxSelectedMessage: "Bạn chỉ có thể chọn tối đa 1 địa điểm",
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
  recruiter: {
    option: EMPLOYER_OPTIONS,
    maxSelected: 3,
    maxSelectedMessage: "Bạn chỉ có thể chọn tối đa 3 nhà tuyển dụng",
  },
};

export const RECRUITERFILTER_CONFIG = {
  location: {
    option: LOCATION_OPTIONS,
    maxSelected: 1,
    maxSelectedMessage: "Bạn chỉ có thể chọn tối đa 1 địa điểm",
  },
};

export const PAGINATION_PAGESIZE = [10, 20, 30, 40, 50];

export enum ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  HR = "HR",
  APPLICANT = "APPLICANT",
}
