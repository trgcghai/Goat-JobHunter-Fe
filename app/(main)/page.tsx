import { FeaturedEmployers } from "@/app/(main)/components/FeaturedEmployers";
import { FeaturedJobs } from "@/app/(main)/components/FeaturedJobs";
import { HeroSection } from "@/app/(main)/components/HeroSection";
import { LatestBlogs } from "@/app/(main)/components/LatestBlogs";

export default function Home() {
  console.log("check git user");

  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <FeaturedEmployers />
      <LatestBlogs />
    </>
  );
}
