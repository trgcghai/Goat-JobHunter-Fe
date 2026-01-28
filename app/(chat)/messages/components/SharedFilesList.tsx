import { Card } from '@/components/ui/card';
import { FileText, FileArchive, Download } from 'lucide-react';
import { MessageType } from '@/types/model';
import { Button } from '@/components/ui/button';

interface SharedFilesListProps {
  readonly files: MessageType[];
}

export function SharedFilesList({ files }: SharedFilesListProps) {
  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
        Chưa có file nào
      </div>
    );
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-5 w-5" />;
    if (type.includes('zip') || type.includes('rar')) return <FileArchive className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-2">
      {files.map((message) => (
        <Card key={message.messageId} className="group py-0!">
          <div className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors rounded-lg">
            <div className="flex-shrink-0 text-muted-foreground">
              {getFileIcon(message.messageType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.content}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(message.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => window.open(message.content, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}