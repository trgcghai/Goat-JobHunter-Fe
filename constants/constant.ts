import { Option } from "@/components/ui/MultipleSelector";
import { Level, WorkingType } from "@/types/enum";

export const LEVEL_OPTIONS = [
  { value: Level.INTERN, label: "Intern" },
  { value: Level.FRESHER, label: "Fresher" },
  { value: Level.JUNIOR, label: "Junior" },
  { value: Level.MIDDLE, label: "Middle" },
  { value: Level.SENIOR, label: "Senior" },
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

export const JOBFILTER_CONFIG = {
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
};

export const RECRUITERFILTER_CONFIG = {
  location: {
    option: LOCATION_OPTIONS,
    maxSelected: 1,
    maxSelectedMessage: "Bạn chỉ có thể chọn tối đa 1 địa điểm",
  },
};

export const PAGINATION_PAGESIZE = [10, 20, 30, 40, 50];

export const METHOD_OPTIONS = ["GET", "POST", "PUT", "PATCH", "DELETE"]

export enum ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  HR = "HR",
  APPLICANT = "APPLICANT",
}
