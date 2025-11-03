"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { allJobs, allRecruiter } from "@/constants/sample";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  DollarSign,
  Globe,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecruiterDetailPage() {
  const params = useParams();
  const recruiterId = Number(params.id);
  const recruiter = allRecruiter.find((r) => r.userId === recruiterId);

  if (!recruiter) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Không tìm thấy nhà tuyển dụng
            </h1>
            <Link href="/recruiters">
              <Button>Quay lại trang nhà tuyển dụng</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Filter jobs by recruiter
  const recruiterJobs = allJobs.slice(0, 10);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/recruiters"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại trang nhà tuyển dụng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 py-0">
              <CardHeader className="p-6">
                <div className="flex items-start gap-6">
                  <div className="h-24 w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={recruiter.avatar || "/placeholder.svg"}
                      alt={recruiter.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {recruiter.name}
                    </h1>
                    <div className="gap-4 text-sm text-muted-foreground space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{recruiter.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={recruiter.website || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {recruiter.website || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="">
                          <span className="font-semibold text-primary">
                            {recruiterJobs.length}{" "}
                          </span>
                          công việc đang tuyển
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <Separator className="mb-6" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Giới Thiệu Công Ty
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {recruiter.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground">
                  Thông Tin Liên Hệ
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Địa chỉ
                    </p>
                    <p className="text-foreground font-medium">
                      {recruiter.address}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Website
                    </p>
                    <a
                      href={recruiter.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {recruiter.website || "N/A"}
                    </a>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Số lượng việc làm
                    </p>
                    <p className="text-foreground font-medium">
                      {recruiterJobs.length} công việc
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {recruiterJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Việc Làm Đang Tuyển ({recruiterJobs.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recruiterJobs.map((job) => (
                <Link key={job.jobId} href={`/jobs/${job.jobId}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="mb-2">
                          {job.level}
                        </Badge>
                        <Badge
                          variant={job.active ? "default" : "outline"}
                          className="mb-2"
                        >
                          {job.active ? "Đang tuyển" : "Đã đóng"}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-1">
                        {job.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.workingType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Hết hạn:{" "}
                            {new Date(job.endDate).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground line-clamp-2 mb-4">
                        {job.description}
                      </p>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill.skillId}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
