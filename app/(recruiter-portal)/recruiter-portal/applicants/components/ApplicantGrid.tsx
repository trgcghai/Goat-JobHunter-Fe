import { Applicant } from "@/types/model";
import ApplicantGridCard from "@/app/(recruiter-portal)/recruiter-portal/applicants/components/ApplicantGridCard";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";

interface ApplicantGridProps {
  applicants: Applicant[];
}

const ApplicantGrid = ({ applicants }: ApplicantGridProps) => {

  if (applicants.length === 0) {
    return <Empty>
      <EmptyHeader>
        <EmptyTitle>Không tìm thấy ứng viên phù hợp</EmptyTitle>
        <EmptyDescription>Vui lòng điều chỉnh tiêu chí tìm kiếm hoặc thử lại sau.</EmptyDescription>
      </EmptyHeader>
    </Empty>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {applicants.map((applicant) => (
        <ApplicantGridCard
          key={applicant.userId}
          applicant={applicant}
          onContact={() => console.log(applicant)}
        />
      ))}
    </div>
  );
};
export default ApplicantGrid;
