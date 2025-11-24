import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recruiter } from "@/types/model";
import { capitalize } from "lodash";
import { ArrowRight, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecruiterListCardProps {
  recruiter: Recruiter;
}

const RecruiterListCard = ({ recruiter }: RecruiterListCardProps) => {
  const [imageError, setImageError] = useState(false);
  const hasAvatar = recruiter.avatar && !imageError;

  return (
    <Link href={`/recruiters/${recruiter.userId}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="h-[200px] w-[200px] shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {hasAvatar ? (
                <Image
                  src={recruiter.avatar}
                  alt={recruiter.fullName}
                  className="w-full h-full object-cover aspect-square"
                  width={200}
                  height={200}
                  onError={() => setImageError(true)}
                />
              ) : (
                <User className="w-24 h-24 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-between">
              <h3 className="font-bold text-xl text-foreground mb-1">
                {recruiter.fullName}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{capitalize(recruiter.address)}</span>
                </div>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <p>{recruiter.contact.email || "N/A"}</p>
                </div>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{recruiter.contact.phone}</span>
                </div>
              </div>
              {recruiter.description ? (
                <MarkdownDisplay
                  content={recruiter.description}
                  className="text-sm text-foreground line-clamp-2"
                />
              ) : (
                <p className="text-sm text-foreground line-clamp-2">
                  Không có mô tả
                </p>
              )}
              <div className="flex justify-end w-full">
                <Button className="rounded-xl">
                  Xem Công Ty
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecruiterListCard;
