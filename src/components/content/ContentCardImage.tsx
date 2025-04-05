
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from "@/components/ui/button";
import { Heart, Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { getEnhancedImageUrl } from '@/utils/contentImageUtils';

interface ContentCardImageProps {
  item: {
    id: number;
    title: string;
    type: string;
    imageUrl?: string;
    rating?: number;
    artist?: string;
  };
  isLiked: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const ContentCardImage: React.FC<ContentCardImageProps> = ({ 
  item, 
  isLiked, 
  onToggleFavorite 
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      <AspectRatio ratio={2/3}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
              {item.type === 'movie' ? (
                <>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18"></path>
                  </svg>
                  <p className="mt-2 text-xs text-gray-400">Loading...</p>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                  <p className="mt-2 text-xs text-gray-400">Loading...</p>
                </>
              )}
            </div>
          </div>
        )}
        <img
          src={getEnhancedImageUrl(item)}
          alt={item.title}
          className="object-cover w-full h-full"
          onLoad={handleImageLoad}
          onError={() => setLoading(false)}
        />
      </AspectRatio>
      
      {item.rating && (
        <div 
          className="absolute top-2 right-2 flex items-center bg-black/70 text-yellow-400 px-1.5 py-0.5 rounded-full text-xs"
        >
          <Star className="w-3 h-3 mr-0.5" fill="currentColor" />
          {item.rating}
        </div>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-2 left-2 h-7 w-7 rounded-full transition-transform hover:scale-110",
          isLiked ? "bg-pink-500/20 text-pink-500" : "bg-black/50 text-gray-400 hover:text-pink-300"
        )}
        onClick={onToggleFavorite}
      >
        <Heart className={cn("h-3.5 w-3.5", isLiked ? "fill-current" : "")} />
      </Button>
    </div>
  );
};

export default ContentCardImage;
