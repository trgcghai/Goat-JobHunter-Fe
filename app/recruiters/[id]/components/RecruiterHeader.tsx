import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface RecruiterHeaderProps {
  recruiter: Recruiter;
}

export function RecruiterHeader({ recruiter }: RecruiterHeaderProps) {
  return (
    <section className="border-b border-border bg-primary/5 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-24 w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src={recruiter.avatar || "/placeholder.svg"}
              alt={recruiter.name}
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {recruiter.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{recruiter.address}</span>
              </div>
              {recruiter.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${recruiter.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {recruiter.email}
                  </a>
                </div>
              )}
              {recruiter.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <a
                    href={`tel:${recruiter.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {recruiter.phone}
                  </a>
                </div>
              )}
              {recruiter.website && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a
                    href={recruiter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {recruiter.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
