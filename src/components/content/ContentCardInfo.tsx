
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import { getExternalContentUrl } from '@/utils/contentUrlUtils';

interface ContentCardInfoProps {
  item: {
    title: string;
    type: string;
    year?: number;
    genre?: string;
    artist?: string;
    url?: string;
    platform?: string[];
  };
  onExternalLink: (e: React.MouseEvent) => void;
}

const ContentCardInfo: React.FC<ContentCardInfoProps> = ({ 
  item, 
  onExternalLink 
}) => {
  return (
    <div className="p-2">
      <h3 className="text-sm font-semibold line-clamp-1 text-white">
        {item.title}
      </h3>
      
      <div className="mt-1 space-y-1">
        {item.type === 'movie' ? (
          <div className="flex flex-wrap gap-1 text-xs">
            {item.year && <span className="text-gray-300">{item.year}</span>}
            {item.genre && <span className="text-gray-400">• {item.genre}</span>}
          </div>
        ) : (
          <div className="text-xs text-gray-300 line-clamp-1">{item.artist}</div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-1.5 text-xs rounded-md hover:bg-purple-900/30 text-gray-300"
          onClick={onExternalLink}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          {item.type === 'movie' ? 'Watch' : 'Listen'}
        </Button>
      </div>
    </div>
  );
};

export default ContentCardInfo;
