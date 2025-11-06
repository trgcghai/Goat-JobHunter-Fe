"use client";
import {
  FeaturedEmployers,
  FeaturedJobs,
  HeroSection,
  LatestBlogs,
} from "@/app/(main)/components";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <FeaturedEmployers />
      <LatestBlogs />
    </>
  );
}
