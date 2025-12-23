import { useState } from "react"
import { ThumbsUp, Lightbulb, Heart, Clover, Smile, PartyPopper } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Reaction = {
  id: string
  icon: React.ReactNode
  label: string
  color: string
}

const reactions: Reaction[] = [
  { id: "like", icon: <ThumbsUp className="w-5 h-5" />, label: "Like", color: "bg-[#0A66C2] hover:bg-[#004182]" },
  {
    id: "celebrate",
    icon: <PartyPopper className="w-5 h-5" />,
    label: "Celebrate",
    color: "bg-[#6DAF3D] hover:bg-[#5A9130]",
  },
  { id: "support", icon: <Clover className="w-5 h-5" />, label: "Support", color: "bg-[#DF704D] hover:bg-[#C95A3A]" },
  { id: "love", icon: <Heart className="w-5 h-5" />, label: "Love", color: "bg-[#DF704D] hover:bg-[#C95A3A]" },
  {
    id: "insightful",
    icon: <Lightbulb className="w-5 h-5" />,
    label: "Insightful",
    color: "bg-[#F5C344] hover:bg-[#D9AB2A]",
  },
  { id: "funny", icon: <Smile className="w-5 h-5" />, label: "Funny", color: "bg-[#F5C344] hover:bg-[#D9AB2A]" },
]

interface ReactionButtonProps {
  initialReaction?: string | null
  onReactionChange?: (reactionId: string | null) => void
  totalReactions?: number
  onLikeClick: () => void
}

export function ReactionButton({
  initialReaction = null,
  onReactionChange,
  totalReactions,
  onLikeClick,
}: ReactionButtonProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(initialReaction)
  const [open, setOpen] = useState(false)

  const handleReactionClick = (reactionId: string) => {
    const newReaction = selectedReaction === reactionId ? null : reactionId
    setSelectedReaction(newReaction)
    setOpen(false)
    onReactionChange?.(newReaction)
  }

  const selectedReactionData = reactions.find((r) => r.id === selectedReaction)

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button
          onClick={() => {
            if (selectedReaction) {
              setSelectedReaction(null)
              onReactionChange?.(null)
              onLikeClick()
            }
          }}
          variant="ghost"
          size="icon"
          className="flex items-center rounded-full gap-1"
        >
          {selectedReactionData ? (
            <>
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-white",
                  selectedReactionData.color.split(" ")[0],
                )}
              >
                {selectedReactionData.icon}
              </div>
              <span>{selectedReactionData.label}</span>
            </>
          ) : (
            <>
              <ThumbsUp className="w-5 h-5" />
              {totalReactions}
            </>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-2 rounded-full" side="top" align="start">
        <div className="flex items-center gap-2">
          {reactions.map((reaction, index) => (
            <Button
              key={reaction.id}
              onClick={() => handleReactionClick(reaction.id)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer",
                "hover:scale-110 active:scale-95",
                reaction.color,
                "animate-in fade-in zoom-in-50",
              )}
              style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: "both",
              }}
            >
              {reaction.icon}
            </Button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}