import type { Conversation, Message, User, SharedMedia, SharedLink, SharedFile } from './types';

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  avatar: '/diverse-user-avatars.png',
  online: true,
};

export const users: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    avatar: '/professional-woman.png',
    online: true,
  },
  {
    id: 'user-3',
    name: 'Mike Chen',
    avatar: '/smiling-man.png',
    online: false,
  },
  {
    id: 'user-4',
    name: 'Emma Wilson',
    avatar: '/casual-woman.png',
    online: true,
  },
  {
    id: 'user-5',
    name: 'Alex Martinez',
    avatar: '/person-friendly.jpg',
    online: false,
  },
  {
    id: 'user-6',
    name: 'Lisa Anderson',
    avatar: '/business-woman.png',
    online: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    user: users[0],
    lastMessage: 'Hey! Did you see the new design?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    user: users[1],
    lastMessage: 'Thanks for your help yesterday!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    user: users[2],
    lastMessage: "Let's catch up this weekend",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    user: users[3],
    lastMessage: 'Perfect! See you then',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0,
  },
  {
    id: 'conv-5',
    user: users[4],
    lastMessage: 'The meeting is confirmed for 3pm',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unreadCount: 0,
  },
];

export const messagesByConversation: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      senderId: 'user-2',
      text: 'Hi! How are you doing?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      text: "I'm great! Just finished the new feature",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
    },
    {
      id: 'msg-3',
      senderId: 'user-2',
      text: 'That sounds awesome! Can you show me?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
    },
    {
      id: 'msg-4',
      senderId: 'user-1',
      text: 'Sure, let me share the screenshots',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: 'msg-5',
      senderId: 'user-2',
      text: 'Hey! Did you see the new design?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
  ],
  'conv-2': [
    {
      id: 'msg-6',
      senderId: 'user-3',
      text: 'Hey, can you help me with something?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 'msg-7',
      senderId: 'user-1',
      text: 'Of course! What do you need?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
    },
    {
      id: 'msg-8',
      senderId: 'user-3',
      text: 'Thanks for your help yesterday!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
  ],
  'conv-3': [
    {
      id: 'msg-9',
      senderId: 'user-4',
      text: 'Are you free this weekend?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: 'msg-10',
      senderId: 'user-1',
      text: 'Yes! What did you have in mind?',
      timestamp: new Date(Date.now() - 150 * 60 * 1000),
    },
    {
      id: 'msg-11',
      senderId: 'user-4',
      text: "Let's catch up this weekend",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ],
};

export const sharedMediaByConversation: Record<string, import('./types').SharedMedia[]> = {
  'conv-1': [
    {
      id: 'media-1',
      type: 'image',
      url: '/placeholder.svg?key=n1rd8',
      thumbnail: '/placeholder.svg?key=rxy1m',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-2',
      type: 'image',
      url: '/placeholder.svg?key=4z1w3',
      thumbnail: '/placeholder.svg?key=ivsvp',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-3',
      type: 'image',
      url: '/placeholder.svg?key=z649m',
      thumbnail: '/placeholder.svg?key=aqu0v',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-4',
      type: 'video',
      url: '/placeholder.svg?key=40rxd',
      thumbnail: '/placeholder.svg?key=cfssz',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-5',
      type: 'image',
      url: '/placeholder.svg?key=0vfmb',
      thumbnail: '/placeholder.svg?key=gpwh7',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-6',
      type: 'image',
      url: '/placeholder.svg?key=zhk70',
      thumbnail: '/placeholder.svg?key=mafui',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  ],
  'conv-2': [
    {
      id: 'media-7',
      type: 'image',
      url: '/placeholder.svg?key=eq64b',
      thumbnail: '/placeholder.svg?key=4r1q8',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'media-8',
      type: 'image',
      url: '/placeholder.svg?key=8qvaz',
      thumbnail: '/placeholder.svg?key=ru7aa',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
  ],
  'conv-3': [
    {
      id: 'media-9',
      type: 'image',
      url: '/placeholder.svg?key=mrdg3',
      thumbnail: '/placeholder.svg?key=f14qj',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
  ],
};

export const sharedLinksByConversation: Record<string, import('./types').SharedLink[]> = {
  'conv-1': [
    {
      id: 'link-1',
      url: 'https://vercel.com/docs/getting-started',
      title: 'Getting Started with Vercel',
      favicon: '/placeholder.svg?key=0cd3s',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: 'link-2',
      url: 'https://nextjs.org/docs',
      title: 'Next.js Documentation',
      favicon: '/placeholder.svg?key=c1ja4',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'link-3',
      url: 'https://ui.shadcn.com',
      title: 'shadcn/ui - Beautifully designed components',
      favicon: '/placeholder.svg?key=a2at1',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'link-4',
      url: 'https://tailwindcss.com/docs',
      title: 'Tailwind CSS Documentation',
      favicon: '/placeholder.svg?key=9q3ek',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
  ],
  'conv-2': [
    {
      id: 'link-5',
      url: 'https://react.dev',
      title: 'React - The library for web and native user interfaces',
      favicon: '/placeholder.svg?key=ywdma',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'link-6',
      url: 'https://typescript.org',
      title: 'TypeScript: JavaScript With Syntax For Types',
      favicon: '/placeholder.svg?key=0msh3',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
  ],
  'conv-3': [
    {
      id: 'link-7',
      url: 'https://github.com/topics/react',
      title: 'React projects on GitHub',
      favicon: '/placeholder.svg?key=vyjdl',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  ],
};

// Mock data with full required fields + Unsplash images

export const mockSharedMedia: SharedMedia[] = [
  {
    id: 'm1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300',
    timestamp: new Date('2025-01-12T10:15:00'),
  },
  {
    id: 'm2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300',
    timestamp: new Date('2025-01-13T14:30:00'),
  },
  {
    id: 'm3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300',
    timestamp: new Date('2025-01-14T09:45:00'),
  },
  {
    id: 'm4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300',
    timestamp: new Date('2025-01-15T18:10:00'),
  },
  {
    id: 'm5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300',
    timestamp: new Date('2025-01-16T20:05:00'),
  },
  {
    id: 'm6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
    timestamp: new Date('2025-01-17T08:40:00'),
  },
];

export const mockSharedLinks: SharedLink[] = [
  {
    id: 'l1',
    title: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    favicon: 'https://www.google.com/s2/favicons?domain=nextjs.org',
    timestamp: new Date('2025-01-10T11:00:00'),
  },
  {
    id: 'l2',
    title: 'Tailwind CSS – Rapidly build modern websites',
    url: 'https://tailwindcss.com',
    favicon: 'https://www.google.com/s2/favicons?domain=tailwindcss.com',
    timestamp: new Date('2025-01-11T16:20:00'),
  },
  {
    id: 'l3',
    title: 'v0.dev – Generative UI',
    url: 'https://v0.dev',
    favicon: 'https://www.google.com/s2/favicons?domain=v0.dev',
    timestamp: new Date('2025-01-12T19:45:00'),
  },
];

export const mockSharedFiles: SharedFile[] = [
  {
    id: 'f1',
    name: 'project-spec.pdf',
    type: 'pdf',
    size: '2.4 MB',
    timestamp: new Date('2025-01-08T09:10:00'),
  },
  {
    id: 'f2',
    name: 'assets-v2.zip',
    type: 'zip',
    size: '15.8 MB',
    timestamp: new Date('2025-01-09T13:55:00'),
  },
];
