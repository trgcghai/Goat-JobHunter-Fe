"use client";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { LOCATION_OPTIONS, SKILL_OPTIONS } from "@/constants/constant";
import { useState } from "react";

export default function HeroSection() {
  const [filters, setFilters] = useState({
    location: "",
    skills: [] as string[],
    employer: "",
    datePosted: "all",
  });

  const handleSkillsChange = (options: Option[]) => {
    setFilters((prev) => ({
      ...prev,
      skills: options.map((opt) => opt.value),
    }));
  };

  const handleLocationChange = (options: Option[]) => {
    setFilters((prev) => ({
      ...prev,
      location: options.length > 0 ? options[0].value : "",
    }));
  };

  const selectedSkills: Option[] = filters.skills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const selectedLocation: Option[] = filters.location
    ? [{ value: filters.location, label: filters.location }]
    : [];

  return (
    <section className="relative bg-linear-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Tìm Công Việc <span className="text-primary">Tuyệt Vời</span> Tại
            GOAT
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu. Nâng cao
            sự nghiệp của bạn cùng GOAT.
          </p>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-12">
            <MultipleSelector
              value={selectedLocation}
              onChange={handleLocationChange}
              defaultOptions={LOCATION_OPTIONS}
              placeholder="Tìm kiếm theo địa điểm..."
              maxSelected={1}
              emptyIndicator={
                <p className="text-center text-sm text-muted-foreground">
                  Không tìm thấy địa điểm
                </p>
              }
              className="rounded-xl w-full"
              hidePlaceholderWhenSelected
            />
            <MultipleSelector
              value={selectedSkills}
              onChange={handleSkillsChange}
              defaultOptions={SKILL_OPTIONS}
              placeholder="Tìm kiếm theo kỹ năng..."
              emptyIndicator={
                <p className="text-center text-sm text-muted-foreground">
                  Không tìm thấy kỹ năng
                </p>
              }
              className="rounded-xl w-full"
              hidePlaceholderWhenSelected
            />

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-xl">
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
