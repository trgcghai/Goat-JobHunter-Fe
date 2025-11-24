"use client";

import BadgeItem from "@/app/(main)/profile/components/ProfileEmailNotification/BadgeItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { useGetSkillsQuery } from "@/services/skill/skillApi";
import { Skill } from "@/types/model";
import { useMemo, useState } from "react";

export default function ProfileEmailNotification() {
  const [skills, setSkills] = useState<Option[]>([]); // value of MultipleSelector
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetSkillsQuery(
    {
      page: 1,
      size: 50,
      name: "",
    },
    {
      skip: !inputValue,
    },
  );
  const selectedSkills: Skill[] = [];

  const skillOptions = useMemo<Option[]>(() => {
    return (
      data?.data?.result.map((skill) => ({
        label: skill.name,
        value: skill.skillId,
      })) || []
    );
  }, [data?.data?.result]);

  const handleCreateSubscription = async () => {
    console.log("Creating");
  };

  const handleDeleteSubscription = async () => {
    console.log("Deleting");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Kỹ năng đã đăng ký (0/5)
        </h2>
        <p className="text-sm text-green-600 mb-4">
          Đăng ký Job Robot để không bỏ lỡ việc làm phù hợp với kỹ năng của bạn.
        </p>

        <div className="flex gap-2">
          <MultipleSelector
            options={skillOptions}
            value={skills}
            onChange={setSkills}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
            placeholder="Tìm kiếm theo kỹ năng..."
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">
                Không tìm thấy kỹ năng
              </p>
            }
            className="rounded-xl flex-1"
            hidePlaceholderWhenSelected
          />
          <Button
            onClick={handleCreateSubscription}
            className="rounded-xl bg-green-600 hover:bg-green-700"
          >
            Đăng ký
          </Button>
        </div>

        {selectedSkills.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <BadgeItem
                key={skill.skillId}
                item={skill}
                onRemove={handleDeleteSubscription}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 text-center py-8 border-2 border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              Chưa có kỹ năng nào được đăng ký
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Hãy chọn kỹ năng và nhấn &quot;Đăng ký&quot; để nhận thông báo
              việc làm
            </p>
          </div>
        )}

        {skills.length >= 5 && (
          <div className="mt-4 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl">
            <p className="font-medium">Đã đạt giới hạn tối đa</p>
            <p className="text-xs mt-1">
              Bạn chỉ có thể đăng ký tối đa 5 kỹ năng. Hãy xóa một kỹ năng để
              thêm kỹ năng mới.
            </p>
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

        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
          <p className="text-sm text-muted-foreground">
            Tính năng đang được phát triển
          </p>
        </div>
      </Card>
    </div>
  );
}
