export interface User {
  id: string
  name: string
  avatar: string
  online: boolean
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

export interface Conversation {
  id: string
  user: User
  lastMessage: string
  timestamp: Date
  unreadCount: number
}

export interface SharedMedia {
  id: string
  type: "image" | "video"
  url: string
  thumbnail: string
  timestamp: Date
}

export interface SharedLink {
  id: string
  url: string
  title: string
  favicon?: string
  timestamp: Date
}

export interface SharedFile {
  id: string
  name: string
  type: string
  size: string
  timestamp: Date
}
