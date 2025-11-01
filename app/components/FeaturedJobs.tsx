import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { allJobs } from "@/constants/sample";
import { formatDate } from "@/utils/formatDate";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

export function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Công Việc Nổi Bật
          </h2>
          <p className="text-muted-foreground">
            Những cơ hội việc làm mới nhất từ các công ty hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.slice(0, 3).map((job) => (
            <Link key={job.jobId} href={`/jobs/${job.jobId}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                      <Badge
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-accent transition-colors"
                      >
                        {job.workingType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-primary">
                        ${job.salary.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {job.createdAt && (
                        <span>{formatDate(job.createdAt)}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-foreground line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
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

        <div className="mt-8 text-center">
          <Link href="/jobs">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
            >
              Xem Tất Cả Việc Làm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
