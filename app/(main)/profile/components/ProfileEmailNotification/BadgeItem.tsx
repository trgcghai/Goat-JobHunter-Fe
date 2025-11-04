import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";

interface BadgeItemProps {
  item: string;
  onRemove: (item: string) => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ item, onRemove }) => {
  return (
    <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full text-sm pl-4">
      <span>{item}</span>
      <Button
        onClick={() => onRemove(item)}
        variant={"ghost"}
        size={"icon-sm"}
        className="hover:text-destructive transition-colors text-lg font-semibold p-0"
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </Badge>
  );
};

export default BadgeItem;
