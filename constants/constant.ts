import { Option } from "@/components/ui/MultipleSelector";
import { Level, WorkingType } from "@/types/enum";

export const LOCATION_OPTIONS: Option[] = [
  { value: "Ho Chi Minh City", label: "Ho Chi Minh City" },
  { value: "Hanoi", label: "Hanoi" },
  { value: "Da Nang", label: "Da Nang" },
  { value: "Can Tho", label: "Can Tho" },
];

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

export const LEVEL_OPTIONS: Option[] = Object.entries(Level).map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ([_, value]) => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }),
);
