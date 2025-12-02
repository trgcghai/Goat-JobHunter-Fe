import { Recruiter } from "@/types/model";
import { User, UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import useRecruiterActions from "@/hooks/useRecruiterActions";
import { Button } from "@/components/ui/button";

interface RecruiterHeaderProps {
  recruiter: Recruiter;
  isFollowed: boolean;
}

export default function RecruiterHeader({
  recruiter,
  isFollowed
}: RecruiterHeaderProps) {
  const { handleToggleFollowRecruiter } = useRecruiterActions();

  const [imageError, setImageError] = useState(false);

  const name = useMemo(() => recruiter.fullName || "N/A", [recruiter.fullName]);
  const hasAvatar = useMemo(
    () => recruiter.avatar && !imageError,
    [recruiter.avatar, imageError]
  );

  return (
    <div className="flex items-start gap-6">
      <div className="h-24 w-24 shrink-0 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
        {hasAvatar ? (
          <Image
            src={recruiter.avatar!}
            alt={String(name)}
            className="w-full h-full object-cover"
            width={96}
            height={96}
            onError={() => setImageError(true)}
          />
        ) : (
          <User className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1">
        <div className={"flex items-center justify-between mb-2"}>
          <h1 className="text-3xl font-bold text-foreground">{name}</h1>
        </div>
        <Button
          onClick={(e) => handleToggleFollowRecruiter(e, recruiter, isFollowed)}
          variant={isFollowed ? "outline" : "default"}
          className="rounded-xl"
          title={isFollowed ? "Bỏ theo dõi" : "Theo dõi"}
        >
          {isFollowed ? (
            <>
              <UserMinus className="w-4 h-4" />
              Bỏ theo dõi
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Theo dõi
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
