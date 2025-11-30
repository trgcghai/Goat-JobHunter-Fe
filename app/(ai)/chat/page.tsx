// import { Send } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
//
// export default function AIChatPage() {
//   return (
//     <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/20">
//       <div className="w-full max-w-3xl space-y-8">
//         <div className="text-center space-y-2">
//           <h1 className="text-5xl font-light text-primary bg-clip-text ">
//             Chào bạn!
//           </h1>
//           <p className="text-muted-foreground text-sm">
//             Tôi là trợ lý AI thông minh của &#34;Goat Tìm Kiếm Việc Làm&#34;, rất vui được hỗ trợ bạn.
//           </p>
//         </div>
//
//         <div className="relative">
//           <div className="flex items-center gap-3 bg-card rounded-2xl border border-border shadow-lg p-2 transition-all hover:shadow-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
//             <Input
//               placeholder="Nhập câu hỏi của bạn..."
//               className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
//             />
//             <Button
//               size="icon"
//               variant="ghost"
//               className="h-10 w-10 rounded-xl shrink-0"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAiChatMutation } from "@/services/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function AIChatPage() {
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

  const parseMarkdown = (content: string) => {
    const html = marked.parse(content);
    // @ts-expect-error DOMPurify types issue
    return DOMPurify.sanitize(html);
  };

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

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-5xl font-light text-primary bg-clip-text">
                  Chào bạn!
                </h1>
                <p className="text-muted-foreground text-sm">
                  Tôi là trợ lý AI thông minh của &#34;Goat Tìm Kiếm Việc
                  Làm&#34;, rất vui được hỗ trợ bạn.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
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
                    "max-w-[80%] rounded-xl px-4 py-2 prose prose-sm",
                    message.role === "user"
                      ? "bg-primary text-white prose-invert"
                      : "bg-muted"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(message.content),
                  }}
                />
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-muted flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Đang suy nghĩ...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-card rounded-2xl border border-border shadow-lg p-2 transition-all hover:shadow-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-xl shrink-0"
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
      </div>
    </div>
  );
}