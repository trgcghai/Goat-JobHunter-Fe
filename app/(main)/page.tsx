import {
  FeaturedEmployers,
  FeaturedJobs,
  HeroSection,
  LatestBlogs,
} from "@/app/(main)/components";

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
