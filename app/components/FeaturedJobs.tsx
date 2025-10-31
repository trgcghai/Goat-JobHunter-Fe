import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Vietnam",
    location: "Ho Chi Minh City",
    salary: "$2,000 - $3,500",
    type: "Full-time",
    description:
      "Looking for an experienced frontend engineer to join our growing team.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Hanoi",
    salary: "$1,800 - $2,800",
    type: "Full-time",
    description: "Join our product team and shape the future of our platform.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Da Nang",
    salary: "$1,500 - $2,500",
    type: "Full-time",
    description:
      "Create beautiful and intuitive user experiences for our clients.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  },
];

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
              key={job.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
            >
              <Image
                src={job.image || "/placeholder.svg"}
                alt={job.company}
                width={400}
                height={160}
                className="h-40 w-full object-cover"
              />
              <CardHeader>
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <p>📍 {job.location}</p>
                  <p>💼 {job.type}</p>
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
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent rounded-xl"
          >
            Xem Tất Cả Việc Làm
          </Button>
        </div>
      </div>
    </section>
  );
}
