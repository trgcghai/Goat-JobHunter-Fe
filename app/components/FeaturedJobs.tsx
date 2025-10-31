import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { jobs } from "@/constants/sample";
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
          {jobs.map((job) => (
            <Card
              key={job.jobId}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-4"
            >
              <CardHeader>
                <h3 className="font-bold text-lg text-foreground">
                  {job.title}
                </h3>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <p>📍 {job.location}</p>
                  <p>💼 {job.workingType}</p>
                  <p className="font-semibold text-primary">{job.salary}</p>
                </div>
                <p className="text-sm text-foreground">{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                  Xem Chi Tiết
                </Button>
              </CardFooter>
            </Card>
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
