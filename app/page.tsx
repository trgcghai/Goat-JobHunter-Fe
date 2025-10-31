import { FeaturedEmployers } from "@/app/components/FeaturedEmployers";
import { FeaturedJobs } from "@/app/components/FeaturedJobs";
import { HeroSection } from "@/app/components/HeroSection";
import { LatestBlogs } from "@/app/components/LatestBlogs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <FeaturedEmployers />
      <LatestBlogs />
    </>
  );
}
