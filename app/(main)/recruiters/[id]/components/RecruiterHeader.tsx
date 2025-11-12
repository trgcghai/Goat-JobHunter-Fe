import { Recruiter } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface RecruiterHeaderProps {
  recruiter: Recruiter;
}

export default function RecruiterHeader({ recruiter }: RecruiterHeaderProps) {
  const name = useMemo(() => recruiter.fullName || "N/A", [recruiter.fullName]);

  const avatar = useMemo(
    () => recruiter.avatar || "/placeholder.svg",
    [recruiter.avatar],
  );

  const address = useMemo(() => recruiter.address || "", [recruiter.address]);

  const email = useMemo(
    () => recruiter.contact?.email || recruiter.email || "",
    [recruiter.contact?.email, recruiter.email],
  );

  const phone = useMemo(
    () => recruiter.contact?.phone || "",
    [recruiter.contact?.phone],
  );

  return (
    <div className="flex items-start gap-6">
      <div className="h-24 w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
        <Image
          src={avatar}
          alt={String(name)}
          className="w-full h-full object-cover"
          width={96}
          height={96}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
        <div className="gap-4 text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{address ? capitalizeText(address) : "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{email ? capitalizeText(email) : "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{phone ? capitalizeText(phone) : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
