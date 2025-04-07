
import React, { useEffect } from 'react';
import { toast } from "sonner";
import ContentCardContainer from './content-card/ContentCardContainer';
import CardImage from './content-card/CardImage';
import CardHeader from './content-card/CardHeader';
import CardFooter from './content-card/CardFooter';
import MovieDetails from './content-card/MovieDetails';
import MusicDetails from './content-card/MusicDetails';
import { getExternalUrl } from './content-card/utils';

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
  onLike?: (item: ContentItemProps) => void;
  isLiked?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  gender, 
  onOpenDetails, 
  onLike, 
  isLiked = false 
}) => {
  const [loading, setLoading] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(isLiked);
  
  useEffect(() => {
    setIsFavorite(isLiked);
  }, [isLiked]);

  const handleImageLoad = () => {
    setLoading(false);
  };

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
    const url = getExternalUrl(item);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ContentCardContainer onClick={() => onOpenDetails(item)}>
      <CardImage 
        imageUrl={item.imageUrl}
        title={item.title}
        rating={item.rating}
        onLoad={handleImageLoad}
        onError={() => setLoading(false)}
        loading={loading}
      />
      
      <div className="p-4 flex-1 flex flex-col">
        <CardHeader 
          title={item.title}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        
        <p className="text-xs sm:text-sm line-clamp-2 mt-1 text-gray-300 flex-grow">{item.description}</p>
        
        <div className="mt-3 space-y-2">
          {item.type === 'movie' ? (
            <MovieDetails 
              genre={item.genre}
              year={item.year}
              platform={item.platform}
            />
          ) : (
            <MusicDetails 
              artist={item.artist}
              album={item.album}
              genre={item.genre}
            />
          )}
        </div>
        
        <CardFooter 
          type={item.type}
          onDetailsClick={(e) => {
            e.stopPropagation();
            onOpenDetails(item);
          }}
          onExternalLinkClick={handleExternalLink}
        />
      </div>
    </ContentCardContainer>
  );
};

export default ContentCard;
