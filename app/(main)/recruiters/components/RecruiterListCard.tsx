"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recruiter } from "@/types/model";
import { Heart, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecruiterListCardProps {
  recruiter: Recruiter;
  isFollowed: boolean;
  handleFollowRecruiter: (e: React.MouseEvent) => void;
}

export default function RecruiterListCard({
  recruiter,
  isFollowed,
  handleFollowRecruiter,
}: RecruiterListCardProps) {
  return (
    <Link href={`/recruiters/${recruiter.userId}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
              {recruiter.avatar ? (
                <Image
                  src={recruiter.avatar}
                  alt={recruiter.fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {recruiter.fullName}
                  </h3>

                  {recruiter.address && (
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4 mr-2 shrink-0" />
                      <span className="line-clamp-1">{recruiter.address}</span>
                    </div>
                  )}

                  {recruiter.contact?.email && (
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Mail className="h-4 w-4 mr-2 shrink-0" />
                      <span className="line-clamp-1">
                        {recruiter.contact.email}
                      </span>
                    </div>
                  )}

                  {recruiter.contact?.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2 shrink-0" />
                      <span>{recruiter.contact.phone}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant={isFollowed ? "secondary" : "default"}
                  size="sm"
                  className="rounded-xl shrink-0"
                  onClick={handleFollowRecruiter}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isFollowed ? "fill-current" : ""}`}
                  />
                  {isFollowed ? "Đang theo dõi" : "Theo dõi"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
