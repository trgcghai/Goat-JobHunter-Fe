import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, Smile, X, Pilcrow } from "lucide-react"
import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react"
import RichTextEditor from "@/components/RichText/Editor"

interface MessageInputProps {
  readonly onSendMessage: (text?: string, files?: File[]) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [richMessage, setRichMessage] = useState("")
  const [isEditorMode, setIsEditorMode] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    const plainText = isEditorMode
      ? richMessage.replace(/<[^>]*>/g, '').trim()
      : message.trim()

    if (plainText || selectedFiles.length > 0) {
      onSendMessage(isEditorMode ? richMessage : message.trim(), selectedFiles)
      setMessage("")
      setRichMessage("")
      setSelectedFiles([])
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleEditorMode = () => {
    if (isEditorMode) {
      // Chuyển từ editor về input thường - giữ plain text
      const plainText = richMessage.replace(/<[^>]*>/g, '').trim()
      setMessage(plainText)
      setRichMessage("")
    } else {
      // Chuyển từ input thường sang editor
      setRichMessage(message ? `<p>${message}</p>` : "")
    }
    setIsEditorMode(!isEditorMode)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedFiles(prev => [...prev, ...newFiles])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  const hasContent = isEditorMode
    ? richMessage.replace(/<[^>]*>/g, '').trim().length > 0
    : message.trim().length > 0

  return (
    <div className="border-t border-border bg-card">
      {selectedFiles.length > 0 && (
        <div className="px-4 pt-3 pb-2 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg text-sm"
              >
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col min-w-0">
                  <span className="truncate max-w-[150px]" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 flex-shrink-0"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className={`flex ${isEditorMode ? 'flex-col gap-3' : 'items-center gap-2'}`}>
          <div className="flex items-center gap-2 flex-shrink-0 w-full">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleAttachClick}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${isEditorMode ? 'bg-accent' : ''}`}
              onClick={toggleEditorMode}
              title={isEditorMode ? "Switch to simple input" : "Switch to rich text editor"}
            >
              <Pilcrow className="h-5 w-5" />
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
            />

            {!isEditorMode && (
              <>
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
                  disabled={!hasContent && selectedFiles.length === 0}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {isEditorMode && (
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-accent/30 rounded-lg overflow-hidden">
                <RichTextEditor
                  value={richMessage}
                  onChange={setRichMessage}
                  placeholder="Type a message..."
                  allowImage={false}
                />
              </div>
              <Button
                onClick={handleSend}
                size="icon"
                className="h-9 w-9 rounded-full flex-shrink-0 mb-1"
                disabled={!hasContent && selectedFiles.length === 0}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}