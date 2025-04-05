
import React, { useEffect } from 'react';
import { toast } from "sonner";
import { getExternalContentUrl } from '@/utils/contentUrlUtils';
import ContentCardImage from './content/ContentCardImage';
import ContentCardInfo from './content/ContentCardInfo';

export interface ContentItemProps {
  id: number;
  title: string;
  description: string;
  type: 'movie' | 'song';
  imageUrl?: string;
  rating?: number;
  platform?: string[];
  genre?: string;
  year?: number;
  artist?: string;
  album?: string;
  url?: string; // External URL for watch/listen
}

interface ContentCardProps {
  item: ContentItemProps;
  gender: 'male' | 'female';
  onOpenDetails: (item: ContentItemProps) => void;
  onLike?: (item: ContentItemProps) => void; // Added onLike prop
  isLiked?: boolean; // New prop to track if the item is already liked
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  gender, 
  onOpenDetails, 
  onLike, 
  isLiked = false 
}) => {
  const [isFavorite, setIsFavorite] = React.useState(isLiked);
  
  useEffect(() => {
    setIsFavorite(isLiked);
  }, [isLiked]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isFavorite;
    setIsFavorite(newState);
    
    if (onLike) {
      onLike(item);
    }
    
    if (newState) {
      toast.success(`Added ${item.title} to favorites`);
    } else {
      toast.info(`Removed ${item.title} from favorites`);
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const externalUrl = getExternalContentUrl(item);
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div 
      className="content-card h-full bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-500/50 cursor-pointer transition-all duration-300"
      onClick={() => onOpenDetails(item)}
    >
      <ContentCardImage 
        item={item} 
        isLiked={isFavorite} 
        onToggleFavorite={toggleFavorite} 
      />
      
      <ContentCardInfo 
        item={item} 
        onExternalLink={handleExternalLink} 
      />
    </div>
  );
};

export default ContentCard;
