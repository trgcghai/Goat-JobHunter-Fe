"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Video, Smile } from "lucide-react"
import { useState } from "react"
import { CreatePostDialog } from "@/app/(social-hub)/hub/fyp/component/CreatePostDialog";

export function CreatePostTrigger() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar-man.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            className="flex-1 justify-start rounded-full bg-accent px-4 py-6 text-muted-foreground hover:bg-accent/80"
            onClick={() => setIsDialogOpen(true)}
          >
            Bạn đang nghĩ gì?
          </Button>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <Button variant="ghost" className="flex-1 gap-2 hover:bg-accent" onClick={() => setIsDialogOpen(true)}>
            <ImageIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Ảnh/Video</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 hover:bg-accent" onClick={() => setIsDialogOpen(true)}>
            <Video className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Video trực tiếp</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 hover:bg-accent" onClick={() => setIsDialogOpen(true)}>
            <Smile className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">Cảm xúc</span>
          </Button>
        </div>
      </Card>

      <CreatePostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
