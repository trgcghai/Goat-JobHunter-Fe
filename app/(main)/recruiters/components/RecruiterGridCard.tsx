import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecruiterGridCardProps {
  recruiter: Recruiter;
}

const RecruiterGridCard = ({ recruiter }: RecruiterGridCardProps) => {
  const [imageError, setImageError] = useState(false);
  const hasAvatar = recruiter.avatar && !imageError;

  return (
    <Link href={`/recruiters/${recruiter.userId}`} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-4">
        <CardHeader className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
              {hasAvatar ? (
                <Image
                  src={recruiter.avatar}
                  alt={recruiter.fullName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <User className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground truncate">
                {recruiter.fullName}
              </h3>

              <div className="mt-1 text-sm text-muted-foreground flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">
                    {recruiter.contact.email || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">
                    {capitalizeText(recruiter.address || "") || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="truncate">
                    {recruiter.contact.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-6 pt-2 pb-2">
          {recruiter.description ? (
            <MarkdownDisplay
              content={recruiter.description || ""}
              className="text-sm text-foreground line-clamp-2"
            />
          ) : (
            <p className="text-sm text-foreground line-clamp-2">
              Không có mô tả
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecruiterGridCard;
