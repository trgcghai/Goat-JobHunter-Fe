import { useMemo, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { reactions } from "@/constants/constant";

interface ReactionButtonProps {
  initialReaction?: string | null; // for post that user has already reacted
  onReactionChange: (reactionId: string | null) => void;
  totalReactions: number;
}

export function ReactionButton({
 initialReaction = null,
 onReactionChange,
 totalReactions
}: ReactionButtonProps) {

  const [selectedReaction, setSelectedReaction] = useState<string | null>(initialReaction);
  const [open, setOpen] = useState(false);

  const handleReactionClick = (reactionId: string) => {
    const newReaction = selectedReaction === reactionId ? null : reactionId;
    setSelectedReaction(newReaction);
    setOpen(false);
    onReactionChange(newReaction);
  };

  const selectedReactionData = useMemo(() => reactions.find((r) => r.id === selectedReaction), [selectedReaction]);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button
          onClick={() => {
            if (selectedReaction) {
              setSelectedReaction(null);
              onReactionChange(null);
            } else {
              setOpen(true);
            }
          }}
          onFocus={(e) => e.preventDefault()} // Prevent open hover card when dialog is open cause the button is focused
          variant="ghost"
          size="icon"
          className="flex items-center rounded-full gap-1"
          style={{ color: selectedReactionData && selectedReactionData.color }}
        >
          {selectedReactionData ? (
            <>
              <selectedReactionData.icon className="w-5 h-5" />
              <span>{totalReactions}</span>
            </>
          ) : (
            <>
              <ThumbsUp className="w-5 h-5" />
              <span>{totalReactions}</span>
            </>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-auto p-2 rounded-full"
        side="top"
        align="start"
      >
        <div className="flex items-center gap-2">
          {reactions.map((reaction, index) => (
            <Button
              key={reaction.id}
              onClick={() => handleReactionClick(reaction.id)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer",
                "hover:scale-125 active:scale-95",
                "animate-in fade-in zoom-in-50",
                `bg-[${reaction.color}] hover:bg-[${reaction.hoverColor}]`
              )}
              style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: "both"
              }}
            >
              <reaction.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}