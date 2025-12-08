import { useEffect, useRef, useState } from "react";
import { useAiChatMutation } from "@/services/ai/conversationApi";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { toast } from "sonner";
import { MessageType } from "@/types/model";
import { MessageTypeRole } from "@/types/enum";

marked.setOptions({
  breaks: true,
  gfm: true
});

export function useAIChat() {
  const [inputMessage, setInputMessage] = useState("");
  const [chat, { isLoading }] = useAiChatMutation();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChat = async () => {
    try {
      if (!inputMessage.trim()) {
        toast.error("Vui lòng nhập tin nhắn.");
        return;
      }

      setMessages(prevMessages => [
        ...prevMessages,
        {
          messageId: new Date().getDate() + Math.floor(Math.random() * 1000000),
          content: inputMessage,
          role: MessageTypeRole.User,
          createdAt: new Date().toISOString()
        }
      ]);

      const result = await chat(inputMessage).unwrap();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          messageId: new Date().getDate() + Math.floor(Math.random() * 1000000),
          content: result,
          role: MessageTypeRole.AI,
          createdAt: new Date().toISOString()
        }
      ]);

      setInputMessage("")

    } catch (error) {
      console.error("Error during AI chat:", error);
      return;
    }
  };


  const parseMarkdown = (content: string) => {
    const html = marked.parse(content);
    // @ts-expect-error DOMPurify types issue
    return DOMPurify.sanitize(html);
  };

  return {
    inputMessage,
    setInputMessage,

    messagesEndRef,
    parseMarkdown,

    isLoading,
    handleChat,

    messages,
    setMessages
  };
}