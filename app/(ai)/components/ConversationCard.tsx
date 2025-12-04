import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare } from "lucide-react";
import { Conversation } from "@/types/model";

interface ConversationCardProps {
  conv: Conversation;
  handleTogglePin: (conversationId: number, isPinned: boolean) => void;
  isLoading: boolean;
}

const ConversationCard = ({ conv, handleTogglePin, isLoading }: ConversationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={conv.conversationId}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        className={"w-full justify-start text-left truncate pr-10"}
      >
        <MessageSquare className="w-4 h-4 mr-1 flex-shrink-0" />
        <span className="truncate">{conv.title}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 ${isHovered ? "block" : "hidden"} `}
        onClick={() => handleTogglePin(conv.conversationId, conv.pinned)}
        disabled={isLoading}
      >
        <Ellipsis className="w-4 h-4 fill-current" />
      </Button>
    </div>
  );
};
export default ConversationCard;
