import { useState, useEffect, useRef } from "react";
import { useAiChatMutation } from "@/services/api";
import { toast } from "sonner";
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
  gfm: true,
});

const STORAGE_KEY = "ai-chat-history";

export function useAIChat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, { isLoading }] = useAiChatMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading chat history", e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen to clear chat event
  useEffect(() => {
    const handleClearChat = () => {
      localStorage.removeItem(STORAGE_KEY);
      setMessages([]);
      toast.success("Đã tạo đoạn chat mới");
    };

    window.addEventListener("clearChat", handleClearChat);

    return () => {
      window.removeEventListener("clearChat", handleClearChat);
    };
  }, []);

  const parseMarkdown = (content: string) => {
    const html = marked.parse(content);
    // @ts-expect-error DOMPurify types issue
    return DOMPurify.sanitize(html);
  };

  const sendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;

    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await chat(messageToSend).unwrap();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || "Xin lỗi, tôi không thể trả lời lúc này.",
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      console.error("Error khi gửi tin nhắn cho AI", e);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Có lỗi xảy ra khi gửi tin nhắn.");
    }
  };

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    toast.success("Đã xóa lịch sử chat");
  };

  return {
    inputMessage,
    setInputMessage,
    messages,
    isLoading,
    messagesEndRef,
    parseMarkdown,
    sendMessage,
    clearChat,
  };
}