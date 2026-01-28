import { MessageType } from '@/types/model';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FileIcon } from 'lucide-react';
import Image from 'next/image';
import { MessageTypeEnum } from '@/types/enum';
import { useMemo } from "react";

interface MessageBubbleProps {
  message: MessageType;
  isOwn: boolean;
  showAvatar?: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export function MessageBubble({ message, isOwn, showAvatar = false, senderName, senderAvatar }: Readonly<MessageBubbleProps>) {
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
    locale: vi,
  });
  const type = useMemo(() => message.messageType, [message.messageType]);

  const isMedia = useMemo(() => type === MessageTypeEnum.IMAGE || type === MessageTypeEnum.VIDEO || type === MessageTypeEnum.AUDIO, [type]);

  const renderContent = () => {
    if (type === MessageTypeEnum.IMAGE) {
      return (
        <Image
          src={message.content}
          alt="Hình ảnh"
          className="max-w-xs max-h-96 rounded-xl object-cover border"
          width={300}
          height={300}
        />
      );
    }

    if (type === MessageTypeEnum.VIDEO) {
      return (
        <video
          src={message.content}
          controls
          className="max-w-xs max-h-96 rounded-xl"
        />
      );
    }

    if (type === MessageTypeEnum.AUDIO) {
      return (
        <audio
          src={message.content}
          controls
          className="max-w-xs"
        />
      );
    }

    if (type === MessageTypeEnum.FILE) {
      const fileName = message.content.split('/').pop() || 'file';
      return (
        <a
          href={message.content}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <FileIcon className="h-5 w-5" />
          <span className="text-sm truncate max-w-[200px]">{fileName}</span>
        </a>
      );
    }

    return <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>;
  };

  return (
    <div className={cn('flex w-full mb-2', isOwn ? 'justify-end' : 'justify-start')}>
      {!isOwn && showAvatar && (
        <Avatar className="h-10 w-10 mr-2 flex-shrink-0">
          <AvatarImage src={senderAvatar || '/placeholder.svg'} alt={senderName} />
          <AvatarFallback>{senderName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && showAvatar && senderName && (
          <span className="text-xs font-medium text-muted-foreground mb-1 px-1">{senderName}</span>
        )}
        {isMedia ? (
          renderContent()
        ) : (
          <div
            className={cn(
              'rounded-2xl px-4 py-2',
              isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            )}
          >
            {renderContent()}
          </div>
        )}
        <span className="text-xs text-muted-foreground mt-1 px-1">{timeAgo}</span>
      </div>
    </div>
  );
}