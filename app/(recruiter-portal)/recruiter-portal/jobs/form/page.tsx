"use client";

import JobForm from "@/app/(recruiter-portal)/recruiter-portal/jobs/form/components/JobForm";
import {
  JobFormData,
  jobSchema
} from "@/app/(recruiter-portal)/recruiter-portal/jobs/form/components/schema";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Option } from "@/components/ui/MultipleSelector";
import useJobActions from "@/hooks/useJobActions";
import { useFetchCareersQuery } from "@/services/career/careerApi";
import { useFetchJobByIdQuery } from "@/services/job/jobApi";
import { useGetSkillsQuery } from "@/services/skill/skillApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Level, WorkingType } from "@/types/enum";

export default function JobFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [inputValue, setInputValue] = useState<string>("");
  const [isFormReady, setIsFormReady] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  const { handleCreateJob, handleUpdateJob, isCreating, isUpdating } =
    useJobActions();

  // Fetch job data if jobId exists (edit mode)
  const {
    data: jobData,
    isLoading: isLoadingJob,
    isFetching: isFetchingJob,
    isSuccess,
    isError
  } = useFetchJobByIdQuery(jobId!, {
    skip: !jobId
  });

  // Fetch skills from API
  const { data: skillsData, isFetching: isFetchingSkills } = useGetSkillsQuery(
    {
      page: 1,
      size: 20,
      name: debouncedInputValue
    },
    {
      skip: !debouncedInputValue || debouncedInputValue.length < 2
    }
  );

  // Fetch careers for career select options
  const { data: careersData } = useFetchCareersQuery({
    page: 1,
    size: 100 // Lấy 100 ngành nghề
  });

  const job = useMemo(() => jobData?.data, [jobData]);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job ? job.title : "",
      description: job ? job.description : "",
      location: job ? job.location : "",
      salary: job ? job.salary : 0,
      quantity: job ? job.quantity : 1,
      level: job ? (job.level as Level) : Level.INTERN,
      workingType: job ? (job.workingType as WorkingType) : WorkingType.FULLTIME,
      startDate: job ? job.startDate.slice(0, 10) : "",
      endDate: job ? job.endDate.slice(0, 10) : "",
      skills: job ? job.skills.map((skill) => ({
        skillId: skill.skillId,
        name: skill.name
      })) : [],
      career: job && job.career ? String(job.career.careerId) : ""
    }
  });

  useEffect(() => {
    // Chỉ khi:
    // - Đang tạo mới (không có jobId) → sẵn sàng ngay
    // - Hoặc đang edit và đã fetch xong job (có data hoặc lỗi)
    if (!jobId || (jobId && (isSuccess || isError))) {
      setIsFormReady(true);
    }
  }, [jobId, isSuccess, isError]);

  useEffect(() => {
    if (job && isSuccess) {
      form.reset({
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        quantity: job.quantity,
        level: job.level as Level,
        workingType: job.workingType as WorkingType,
        startDate: job.startDate.slice(0, 10),
        endDate: job.endDate.slice(0, 10),
        skills: job.skills.map((skill) => ({
          skillId: skill.skillId,
          name: skill.name
        })),
        career: job.career ? job.career.careerId.toString() : ""
      });
    }
  }, [form, job, isSuccess]);

  // Convert API skills to options
  const skillOptions = useMemo<Option[]>(() => {
    if (!debouncedInputValue || debouncedInputValue.length < 2) return [];

    if (!skillsData?.data?.result) return [];

    const selectedSkillIds = form.watch("skills").map((s) => s.skillId);

    return skillsData.data.result
      .filter((skill) => !selectedSkillIds.includes(skill.skillId))
      .map((skill) => ({
        label: skill.name,
        value: skill.skillId.toString()
      }));
  }, [skillsData, debouncedInputValue, form]);

  const careerOptions = useMemo<Option[]>(() => {
    return (
      careersData?.data?.result.map((career) => ({
        label: career.name || "",
        value: String(career.careerId) // Convert ID sang string cho Select value
      })) || []
    );
  }, [careersData]);

  // Debounced search
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedInputValue(value);
    }, 500),
    []
  );

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const onSubmit = async (data: JobFormData) => {
    const submitData = {
      ...data,
      skillIds: data.skills.map((skill) => skill.skillId)
    };

    if (job) {
      await handleUpdateJob(Number(jobId), submitData);
      toast.success("Cập nhật công việc thành công");
    } else {
      await handleCreateJob(submitData);
      toast.success("Tạo công việc thành công");
    }
    router.push("/recruiter-portal/jobs");
  };

  if (isLoadingJob || isFetchingJob) {
    return <LoaderSpin />;
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Link href="/recruiter-portal/jobs">
          <Button variant="link" className="rounded-xl p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-lg font-medium text-destructive">
              Không tìm thấy công việc
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Công việc không tồn tại hoặc đã bị xóa
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <Link href="/recruiter-portal/jobs">
          <Button variant="link" className="rounded-xl mb-4 p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {job ? "Chỉnh sửa công việc" : "Tạo công việc mới"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {job
            ? "Cập nhật thông tin công việc"
            : "Điền thông tin để đăng tuyển vị trí mới"}
        </p>
      </div>

      {!isFormReady && <LoaderSpin />}

      {isFormReady &&
        <JobForm
          form={form}
          onSubmit={onSubmit}
          skillOptions={skillOptions}
          careerOptions={careerOptions}
          inputValue={inputValue}
          handleInputValueChange={handleInputValueChange}
          isFetchingSkills={isFetchingSkills}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isEditMode={!!job}
        />
      }
    </div>
  );
}
