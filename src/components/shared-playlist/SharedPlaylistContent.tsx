
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ContentCard, { ContentItemProps } from '@/components/ContentCard';

interface SharedPlaylistContentProps {
  filteredContent: ContentItemProps[];
  onOpenDetails: (item: ContentItemProps) => void;
}

const SharedPlaylistContent: React.FC<SharedPlaylistContentProps> = ({ filteredContent, onOpenDetails }) => {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
        {filteredContent.map((item: ContentItemProps) => (
          <ContentCard
            key={item.id}
            item={item}
            gender="male"
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SharedPlaylistContent;
