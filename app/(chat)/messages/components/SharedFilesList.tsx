'use client';

import { Card } from '@/components/ui/card';
import { FileText, FileArchive, Download } from 'lucide-react';
import { SharedFile } from '@/app/(chat)/messages/utils/types';
import { Button } from '@/components/ui/button';

interface SharedFilesListProps {
  files: SharedFile[];
}

export function SharedFilesList({ files }: SharedFilesListProps) {
  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">No shared files yet</div>
    );
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="h-5 w-5" />;
    if (type === 'zip') return <FileArchive className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <Card key={file.id} className="group py-0!">
          <div className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors rounded-lg">
            <div className="flex-shrink-0 text-muted-foreground">{getFileIcon(file.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.size}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}