"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, Smile } from "lucide-react"
import { useState, type KeyboardEvent } from "react"

interface MessageInputProps {
  readonly onSendMessage: (text: string) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
          <Smile className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="relative flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="pr-12 bg-accent/50 border-0 focus-visible:ring-1 rounded-full h-10"
          />
        </div>
        <Button
          onClick={handleSend}
          size="icon"
          className="h-9 w-9 rounded-full flex-shrink-0"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
