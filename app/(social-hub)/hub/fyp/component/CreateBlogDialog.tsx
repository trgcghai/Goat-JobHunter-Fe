"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, Smile, MapPin, TagIcon, Sparkles } from "lucide-react"
import { useState } from "react"

interface CreateBlogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateBlogDialog({ open, onOpenChange }: CreateBlogDialogProps) {
  const [content, setContent] = useState("")
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const challenges = ["My Funemployment Story", "AI For Good", "Trend Check"]

  const popularTags = ["#JavaScript", "#React", "#AI", "#Career", "#Tech"]

  const handlePost = () => {
    // Handle post creation logic here
    console.log("[v0] Creating post with:", { content, selectedChallenge, selectedTags })
    onOpenChange(false)
    setContent("")
    setSelectedChallenge(null)
    setSelectedTags([])
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Tạo bài viết</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatar-man.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Nguyễn Trường Nguyên</p>
              <p className="text-xs text-muted-foreground">Công khai</p>
            </div>
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-pink-500" />
              Chọn Challenge (Tùy chọn)
            </Label>
            <div className="flex flex-wrap gap-2">
              {challenges.map((challenge) => (
                <Badge
                  key={challenge}
                  variant={selectedChallenge === challenge ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedChallenge === challenge ? "bg-gradient-to-r from-pink-600 to-pink-500" : ""
                  }`}
                  onClick={() => setSelectedChallenge(selectedChallenge === challenge ? null : challenge)}
                >
                  {challenge}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Bạn đang nghĩ gì?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none border-none text-lg focus-visible:ring-0"
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Tiêu đề bài viết
            </Label>
            <Input id="title" placeholder="Nhập tiêu đề..." className="mt-2" />
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <TagIcon className="h-4 w-4 text-green-500" />
              Thêm tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="mb-3 text-sm font-medium">Thêm vào bài viết của bạn</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ImageIcon className="h-5 w-5 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Video className="h-5 w-5 text-red-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Smile className="h-5 w-5 text-yellow-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <MapPin className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handlePost}
            disabled={!content.trim()}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
          >
            Đăng bài
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
