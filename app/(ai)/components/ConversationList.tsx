import React from "react";
import ConversationCard from "@/app/(ai)/components/ConversationCard";
import { Conversation } from "@/types/model";

interface ConversationListProps {
  conversations: Conversation[];
  handleTogglePin: (conversationId: number, isPinned: boolean) => void;
  handleRename: (conversationId: number, newName: string) => void;
  handleDelete: (conversationId: number) => void;
  isLoading: boolean;
}

const ConversationList = ({ conversations, handleTogglePin, handleRename, handleDelete, isLoading }: ConversationListProps) => {
  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <ConversationCard
          key={conv.conversationId}
          conv={conv}
          isLoading={isLoading}
          handleTogglePin={handleTogglePin}
          handleRename={handleRename}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};
export default ConversationList;
