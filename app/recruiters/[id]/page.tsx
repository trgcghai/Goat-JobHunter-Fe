import { allRecruiter } from "@/constants/sample";
import { notFound } from "next/navigation";
import { RecruiterHeader, RecruiterInfo, RecruiterJobs } from "./components";

export default function RecruiterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recruiterId = Number.parseInt(params.id);
  const recruiter = allRecruiter.find((r) => r.userId === recruiterId);

  if (!recruiter) {
    notFound();
  }

  return (
    <main className="flex-1">
      <RecruiterHeader recruiter={recruiter} />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecruiterInfo recruiter={recruiter} />
            </div>
            <div>
              <RecruiterJobs recruiter={recruiter} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
