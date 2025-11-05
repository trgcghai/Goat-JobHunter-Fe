"use client";

import BadgeItem from "@/app/(main)/profile/components/ProfileEmailNotification/BadgeItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { SKILL_OPTIONS } from "@/constants/constant";
import { useState } from "react";

export default function ProfileEmailNotification() {
  const [skills, setSkills] = useState<string[]>([]);
  const [recruiters, setRecruiters] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [selectedRecruiters, setSelectedRecruiters] = useState<Option[]>([]);

  const handleAddSkills = () => {
    if (selectedSkills.length === 0) return;

    const newSkills = selectedSkills.map((opt) => opt.value);
    const uniqueSkills = [...new Set([...skills, ...newSkills])].slice(0, 5);

    setSkills(uniqueSkills);
    setSelectedSkills([]);
    // TODO: Call API to save skills
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
    // TODO: Call API to remove skill
  };

  const handleAddRecruiters = () => {
    if (selectedRecruiters.length === 0) return;

    const newRecruiters = selectedRecruiters.map((opt) => opt.value);
    const uniqueRecruiters = [...new Set([...recruiters, ...newRecruiters])];

    setRecruiters(uniqueRecruiters);
    setSelectedRecruiters([]);
    // TODO: Call API to follow recruiters
  };

  const handleRemoveRecruiter = (recruiter: string) => {
    setRecruiters(recruiters.filter((r) => r !== recruiter));
    // TODO: Call API to unfollow recruiter
  };

  // Filter out already selected skills
  const availableSkills = SKILL_OPTIONS.filter(
    (opt) => !skills.includes(opt.value),
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Kỹ năng đã đăng ký ({skills.length}/5)
        </h2>
        <p className="text-sm text-green-600 mb-4">
          Đăng ký Job Robot để không bỏ lỡ việc làm phù hợp với kỹ năng của bạn.
        </p>

        <div className="flex gap-2">
          <MultipleSelector
            value={selectedSkills}
            onChange={setSelectedSkills}
            defaultOptions={availableSkills}
            placeholder="Tìm kiếm theo kỹ năng..."
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy kỹ năng
              </p>
            }
            className="rounded-xl flex-1"
            hidePlaceholderWhenSelected
            disabled={skills.length >= 5}
          />
          <Button
            onClick={handleAddSkills}
            disabled={selectedSkills.length === 0 || skills.length >= 5}
            className="rounded-xl bg-green-600 hover:bg-green-700"
          >
            Đăng ký
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <BadgeItem
                key={skill}
                item={skill}
                onRemove={handleRemoveSkill}
              />
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Nhà tuyển dụng đã theo dõi
        </h2>
        <p className="text-sm text-green-600 mb-4">
          Nhận thêm thông báo khi nhà tuyển dụng bạn yêu thích có việc làm mới.
        </p>

        <div className="flex gap-2">
          <MultipleSelector
            value={selectedRecruiters}
            onChange={setSelectedRecruiters}
            defaultOptions={[
              { value: "TechCorp Vietnam", label: "TechCorp Vietnam" },
              { value: "FPT Software", label: "FPT Software" },
              { value: "VNG Corporation", label: "VNG Corporation" },
              { value: "Viettel Group", label: "Viettel Group" },
              { value: "Tiki", label: "Tiki" },
            ]}
            placeholder="Tìm kiếm nhà tuyển dụng..."
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy nhà tuyển dụng
              </p>
            }
            className="rounded-xl flex-1"
            hidePlaceholderWhenSelected
          />
          <Button
            onClick={handleAddRecruiters}
            disabled={selectedRecruiters.length === 0}
            className="rounded-xl bg-green-600 hover:bg-green-700"
          >
            Theo dõi
          </Button>
        </div>

        {recruiters.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {recruiters.map((recruiter) => (
              <BadgeItem
                key={recruiter}
                item={recruiter}
                onRemove={handleRemoveRecruiter}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
