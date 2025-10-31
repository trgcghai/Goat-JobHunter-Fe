"use client";

import { FeaturedEmployers } from "@/app/components/FeaturedEmployers";
import { FeaturedJobs } from "@/app/components/FeaturedJobs";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { HeroSection } from "@/app/components/HeroSection";
import { LatestBlogs } from "@/app/components/LatestBlogs";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Job Seeker",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main>
        <HeroSection />
        <FeaturedJobs />
        <FeaturedEmployers />
        <LatestBlogs />
      </main>
      <Footer />
    </div>
  );
}
