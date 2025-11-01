"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Building2, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecruiterCardProps {
  recruiter: Recruiter;
  viewMode: "list" | "grid";
}

export function RecruiterCard({ recruiter, viewMode }: RecruiterCardProps) {
  if (viewMode === "grid") {
    return (
      <Link href={`/recruiter/${recruiter.userId}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
          <div className="p-6">
            <div className="mb-4 h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <Image
                src={recruiter.avatar || "/placeholder.svg"}
                alt={recruiter.name}
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-1">
              {recruiter.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {recruiter.address}
            </p>

            <p className="text-sm text-foreground mb-4 line-clamp-2">
              {recruiter.description}
            </p>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground">{recruiter.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <a
                  href={recruiter.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {recruiter.website}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-foreground">
                  {recruiter.jobs?.length || 0} công việc mở
                </span>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              Xem Chi Tiết
            </Button>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/recruiter/${recruiter.userId}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="p-6 flex gap-4">
          <div className="h-20 w-20 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src={recruiter.avatar || "/placeholder.svg"}
              alt={recruiter.name}
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {recruiter.name}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {recruiter.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">
                  {recruiter.jobs?.length || 0} jobs
                </span>
              </div>
            </div>

            <p className="text-sm text-foreground mb-3 line-clamp-2">
              {recruiter.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">
                  {recruiter.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <a
                  href={recruiter.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Website
                </a>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              Xem Chi Tiết
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
