import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { recruiters } from "@/constants/sample";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedEmployers() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Nhà Tuyển Dụng Nổi Bật
          </h2>
          <p className="text-muted-foreground">
            Các công ty hàng đầu đang tuyển dụng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recruiters.map((employer) => (
            <Card
              key={employer.userId}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
            >
              <Image
                src={employer.avatar || "/placeholder.svg"}
                alt={employer.name}
                width={400}
                height={160}
                className="h-40 w-full object-cover"
              />
              <CardHeader>
                <h3 className="font-bold text-lg text-foreground">
                  {employer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {employer.website}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-foreground mb-4 line-clamp-2">
                  {employer.description}
                </p>
                <div className="rounded-lg bg-background">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">
                      {employer.jobs?.length || 0}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      vị trí đang tuyển
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/recruiters/${employer.userId}`}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
                  >
                    Xem Công Ty
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/recruiters">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
            >
              Khám Phá Thêm Nhà Tuyển Dụng
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
