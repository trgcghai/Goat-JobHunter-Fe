"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { SharedMedia } from "@/app/(chat)/messages/utils/types";

interface SharedMediaGridProps {
  media: SharedMedia[]
}

export function SharedMediaGrid({ media }: SharedMediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">Chưa có phương tiện nào</div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {media.map((item) => (
        <button
          key={item.id}
          className="relative aspect-square overflow-hidden rounded-lg bg-muted hover:opacity-90 transition-opacity"
        >
          <Image src={item.thumbnail || item.url} alt="Shared media" fill className="object-cover" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="rounded-full bg-white/90 p-2">
                <Play className="h-4 w-4 fill-black text-black" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
