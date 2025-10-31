import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const employers = [
  {
    id: 1,
    name: "TechCorp Vietnam",
    industry: "Technology",
    openPositions: 12,
    description: "Leading tech company in Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "StartupXYZ",
    industry: "SaaS",
    openPositions: 8,
    description: "Innovative SaaS solutions for businesses",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "DesignStudio",
    industry: "Design",
    openPositions: 5,
    description: "Creative design agency with global clients",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
];

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
          {employers.map((employer) => (
            <Card
              key={employer.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
            >
              <Image
                src={employer.image || "/placeholder.svg"}
                alt={employer.image}
                width={400}
                height={160}
                className="h-40 w-full object-cover"
              />
              <CardHeader>
                <h3 className="font-bold text-lg text-foreground">
                  {employer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {employer.industry}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4">
                  {employer.description}
                </p>
                <div className="p-3 rounded-lg bg-background">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">
                      {employer.openPositions}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      vị trí đang tuyển
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
                >
                  Xem Công Ty
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
          >
            Khám Phá Thêm Nhà Tuyển Dụng
          </Button>
        </div>
      </div>
    </section>
  );
}
