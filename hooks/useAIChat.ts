import { useState, useEffect, useRef } from "react";
import { useAiChatMutation } from "@/services/ai/conversationApi";
import DOMPurify from "dompurify";
import { marked } from "marked";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

marked.setOptions({
  breaks: true,
  gfm: true
});

export function useAIChat() {
  const [inputMessage, setInputMessage] = useState("");
  const [chat, { isLoading }] = useAiChatMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);


  const parseMarkdown = (content: string) => {
    const html = marked.parse(content);
    // @ts-expect-error DOMPurify types issue
    return DOMPurify.sanitize(html);
  };

  return {
    inputMessage,
    setInputMessage,
    isLoading,
    messagesEndRef,
    parseMarkdown
  };
}