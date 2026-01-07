import type { Conversation, Message, User, SharedMedia, SharedLink, SharedFile, Group } from "./types";

export const users: User[] = [
  {
    id: "user-2",
    name: "Sarah Johnson",
    avatar: "/professional-woman.png",
    online: true
  },
  {
    id: "user-3",
    name: "Mike Chen",
    avatar: "/smiling-man.png",
    online: false
  },
  {
    id: "user-4",
    name: "Emma Wilson",
    avatar: "/casual-woman.png",
    online: true
  },
  {
    id: "user-5",
    name: "Alex Martinez",
    avatar: "/person-friendly.jpg",
    online: false
  },
  {
    id: "user-6",
    name: "Lisa Anderson",
    avatar: "/business-woman.png",
    online: true
  }
];

export const teamGroup: Group = {
  id: "group-1",
  name: "Design Team",
  avatar: "/colorful-design-team-badge.jpg",
  description: "Collaborate on design projects and UI updates",
  members: [
    {
      userId: "user-1",
      name: "You",
      avatar: "/diverse-user-avatars.png",
      role: "admin",
      online: true,
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      userId: "user-2",
      name: "Sarah Johnson",
      avatar: "/professional-woman.png",
      role: "member",
      online: true,
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      userId: "user-4",
      name: "Emma Wilson",
      avatar: "/casual-woman.png",
      role: "member",
      online: true,
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      userId: "user-6",
      name: "Lisa Anderson",
      avatar: "/business-woman.png",
      role: "member",
      online: false,
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  ],
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
};

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    isGroup: false,
    user: users[0],
    lastMessage: "Hey! Did you see the new design?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2
  },
  {
    id: "conv-2",
    isGroup: false,
    user: users[1],
    lastMessage: "Thanks for your help yesterday!",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0
  },
  {
    id: "conv-3",
    isGroup: false,
    user: users[2],
    lastMessage: "Let's catch up this weekend",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1
  },
  {
    id: "conv-4",
    isGroup: false,
    user: users[3],
    lastMessage: "Perfect! See you then",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0
  },
  {
    id: "conv-5",
    isGroup: false,
    user: users[4],
    lastMessage: "The meeting is confirmed for 3pm",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unreadCount: 0
  },
  {
    id: "group-conv-1",
    isGroup: true,
    group: teamGroup,
    lastMessage: "Emma: The new mockups look fantastic!",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    unreadCount: 1
  }
];

export const messagesByConversation: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      senderId: "user-2",
      text: "Hi! How are you doing?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: "msg-2",
      senderId: "user-1",
      text: "I'm great! Just finished the new feature",
      timestamp: new Date(Date.now() - 25 * 60 * 1000)
    },
    {
      id: "msg-3",
      senderId: "user-2",
      text: "That sounds awesome! Can you show me?",
      timestamp: new Date(Date.now() - 20 * 60 * 1000)
    },
    {
      id: "msg-4",
      senderId: "user-1",
      text: "Sure, let me share the screenshots",
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: "msg-5",
      senderId: "user-2",
      text: "Hey! Did you see the new design?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ],
  "conv-2": [
    {
      id: "msg-6",
      senderId: "user-3",
      text: "Hey, can you help me with something?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "msg-7",
      senderId: "user-1",
      text: "Of course! What do you need?",
      timestamp: new Date(Date.now() - 90 * 60 * 1000)
    },
    {
      id: "msg-8",
      senderId: "user-3",
      text: "Thanks for your help yesterday!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ],
  "conv-3": [
    {
      id: "msg-9",
      senderId: "user-4",
      text: "Are you free this weekend?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: "msg-10",
      senderId: "user-1",
      text: "Yes! What did you have in mind?",
      timestamp: new Date(Date.now() - 150 * 60 * 1000)
    },
    {
      id: "msg-11",
      senderId: "user-4",
      text: "Let's catch up this weekend",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ],
  "group-conv-1": [
    {
      id: "gmsg-1",
      senderId: "user-2",
      text: "Good morning team! Let's discuss the new design direction",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "gmsg-2",
      senderId: "user-1",
      text: "Great! I've prepared some initial concepts",
      timestamp: new Date(Date.now() - 90 * 60 * 1000)
    },
    {
      id: "gmsg-3",
      senderId: "user-4",
      text: "I'm excited to see them! When can we review?",
      timestamp: new Date(Date.now() - 50 * 60 * 1000)
    },
    {
      id: "gmsg-4",
      senderId: "user-6",
      text: "I'll be there! Looking forward to it",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: "gmsg-5",
      senderId: "user-4",
      text: "The new mockups look fantastic!",
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]
};


// Mock data with full required fields + Unsplash images
export const mockSharedMedia: SharedMedia[] = [
  {
    id: "m1",
    type: "image",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
    timestamp: new Date("2025-01-12T10:15:00")
  },
  {
    id: "m2",
    type: "image",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300",
    timestamp: new Date("2025-01-13T14:30:00")
  },
  {
    id: "m3",
    type: "image",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300",
    timestamp: new Date("2025-01-14T09:45:00")
  },
  {
    id: "m4",
    type: "image",
    url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300",
    timestamp: new Date("2025-01-15T18:10:00")
  },
  {
    id: "m5",
    type: "image",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300",
    timestamp: new Date("2025-01-16T20:05:00")
  },
  {
    id: "m6",
    type: "image",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
    timestamp: new Date("2025-01-17T08:40:00")
  }
];

export const mockSharedLinks: SharedLink[] = [
  {
    id: "l1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    favicon: "https://www.google.com/s2/favicons?domain=nextjs.org",
    timestamp: new Date("2025-01-10T11:00:00")
  },
  {
    id: "l2",
    title: "Tailwind CSS – Rapidly build modern websites",
    url: "https://tailwindcss.com",
    favicon: "https://www.google.com/s2/favicons?domain=tailwindcss.com",
    timestamp: new Date("2025-01-11T16:20:00")
  },
  {
    id: "l3",
    title: "v0.dev – Generative UI",
    url: "https://v0.dev",
    favicon: "https://www.google.com/s2/favicons?domain=v0.dev",
    timestamp: new Date("2025-01-12T19:45:00")
  }
];

export const mockSharedFiles: SharedFile[] = [
  {
    id: "f1",
    name: "project-spec.pdf",
    type: "pdf",
    size: "2.4 MB",
    timestamp: new Date("2025-01-08T09:10:00")
  },
  {
    id: "f2",
    name: "assets-v2.zip",
    type: "zip",
    size: "15.8 MB",
    timestamp: new Date("2025-01-09T13:55:00")
  }
];
