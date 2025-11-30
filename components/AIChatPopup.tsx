"use client";

import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useAiChatMutation } from "@/services/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface Message {
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

export function AIChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await chat(inputMessage).unwrap();

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

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  const parseMarkdown = (content: string) => {
    const html = marked.parse(content);
    // @ts-expect-error DOMPurify types issue
    return DOMPurify.sanitize(html);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col z-50 py-0 rounded-xl">
          <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">Trợ lý AI</h3>
              <Link
                href="/chat"
                title="Mở trong cửa sổ chat mới"
                target="_blank"
                className="hover:text-gray-300"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white h-8 w-8 rounded-full"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                <p>
                  Chào bạn! Tôi là trợ lý AI thông minh của &#34;Goat Tìm Kiếm Việc Làm&#34;, rất vui được hỗ trợ bạn.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2 text-sm prose prose-sm",
                        message.role === "user"
                          ? "bg-primary text-white prose-invert"
                          : "bg-white border"
                      )}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(message.content),
                      }}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white border flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-500">Đang suy nghĩ...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 rounded-xl"
              />
              <Button
                size="icon"
                className="rounded-xl"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}