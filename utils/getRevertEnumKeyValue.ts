import { Gender } from "@/types/enum";

const getRevertGenderKeyValue = (gender: Gender) => {
  switch (gender) {
    case Gender.NAM:
      return "NAM";
    case Gender.NỮ:
      return "NỮ";
    case Gender.KHÁC:
      return "KHÁC";
    default:
      return "";
  }
};

export { getRevertGenderKeyValue };
