import { Option } from "@/components/ui/MultipleSelector";
import { WorkingType } from "@/types/enum";

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

export const WORKING_TYPE_OPTIONS: Option[] = Object.entries(WorkingType).map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ([_, value]) => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }),
);

export const ROLE_LIST = [
  { label: "Admin", value: "SUPER_ADMIN" },
  { label: "HR", value: "HR" },
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

export const LEVEL_OPTIONS: Option[] = [
  { label: "Fresher", value: "FRESHER" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Senior", value: "SENIOR" },
  { label: "Intern", value: "INTERN" },
  { label: "Middle", value: "MIDDLE" },
];
