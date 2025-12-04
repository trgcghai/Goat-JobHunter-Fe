import React from "react";
import ConversationCard from "@/app/(ai)/components/ConversationCard";
import { Conversation } from "@/types/model";

interface ConversationListProps {
  conversations: Conversation[];
  handleTogglePin: (conversationId: number, isPinned: boolean) => void;
  isLoading: boolean;
}

const ConversationList = ({ conversations, handleTogglePin, isLoading }: ConversationListProps) => {
  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <ConversationCard
          key={conv.conversationId}
          conv={conv}
          handleTogglePin={handleTogglePin}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
export default ConversationList;
