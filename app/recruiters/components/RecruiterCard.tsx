"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Recruiter } from "@/types/model";
import { ArrowRight, Briefcase, Globe, MapPin } from "lucide-react";
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
        <Card
          key={recruiter.userId}
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4"
        >
          <Image
            src={recruiter.avatar || "/placeholder.svg"}
            alt={recruiter.fullName}
            width={400}
            height={160}
            className="h-40 w-full object-cover"
          />
          <CardHeader>
            <h3 className="font-bold text-lg text-foreground">
              {recruiter.fullName}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <Link
                href={recruiter.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {recruiter.website || "N/A"}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4" />
              <span>{recruiter.address}</span>
            </p>
            <div className="rounded-lg bg-background flex items-center gap-2 mt-2">
              <Briefcase className="h-4 w-4" />
              <p className="text-sm">
                <span className="font-semibold text-primary">
                  Số lượng tuyển dụng
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  vị trí đang tuyển
                </span>
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-foreground mb-4 line-clamp-2">
              {recruiter.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // List view
  return (
    <Link href={`/recruiter/${recruiter.userId}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="h-[200px] w-[200px] shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <Image
                src={recruiter.avatar || "/placeholder.svg"}
                alt={recruiter.fullName}
                className="w-full h-full object-cover aspect-square"
                width={200}
                height={200}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-between">
              <h3 className="font-bold text-xl text-foreground mb-1">
                {recruiter.fullName}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Badge variant="default">Số lượng tuyển dụng việc làm</Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{recruiter.address}</span>
                </div>

                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <Globe className="h-4 w-4" />
                  <Link
                    href={recruiter.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {recruiter.website || "N/A"}
                  </Link>
                </div>
              </div>
              <p className="text-sm text-foreground line-clamp-2">
                {recruiter.description}
              </p>
              <div className="flex justify-end w-full">
                <Link href={`/recruiters/${recruiter.userId}`}>
                  <Button className="rounded-xl">
                    Xem Công Ty
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
