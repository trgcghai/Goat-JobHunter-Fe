import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  image: string;
  skills: string[];
  datePosted: string;
}

interface JobListProps {
  jobs: Job[];
  viewMode: "list" | "grid";
}

export function JobList({ jobs, viewMode }: JobListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
          >
            <Image
              src={job.image || "/placeholder.svg"}
              alt={job.company}
              className="h-40 w-full object-cover"
              width={640}
              height={256}
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

              <p className="text-sm text-foreground mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded bg-primary/10 text-primary"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                    +{job.skills.length - 2}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0"
        >
          <div className="flex gap-6 p-6">
            <Image
              src={job.image || "/placeholder.svg"}
              alt={job.company}
              className="w-1/6 aspect-square rounded object-cover shrink-0"
              width={200}
              height={200}
            />

            <div className="flex-1">
              <CardHeader className="p-0 mb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <p className="font-semibold text-primary text-right">
                    {job.salary}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-0 mb-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                </div>

                <p className="text-sm text-foreground mb-3">
                  {job.description}
                </p>
              </CardContent>

              <CardFooter className="p-0 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
