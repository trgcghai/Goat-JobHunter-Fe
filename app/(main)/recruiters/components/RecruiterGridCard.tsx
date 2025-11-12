import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecruiterGridCardProps {
  recruiter: Recruiter;
}

const RecruiterGridCard = ({ recruiter }: RecruiterGridCardProps) => {
  return (
    <Link href={`/recruiters/${recruiter.userId}`} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 pb-4">
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
            <Mail className="h-4 w-4" />
            <Link
              href={recruiter.contact.email || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {recruiter.contact.email || "N/A"}
            </Link>
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{capitalizeText(recruiter.address)}</span>
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{recruiter.contact.phone}</span>
          </p>
        </CardHeader>
        <CardContent className="flex-1 mt-auto">
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
