
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, ExternalLink, Star, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
}

interface ContentCardProps {
  item: ContentItemProps;
  gender: 'male' | 'female';
}

const ContentCard: React.FC<ContentCardProps> = ({ item, gender }) => {
  const [loading, setLoading] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="content-card h-full bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
                {item.type === 'movie' ? (
                  <>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">Loading movie...</p>
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">Loading song...</p>
                  </>
                )}
              </div>
            </div>
          )}
          <img
            src={item.imageUrl || '/placeholder.svg'}
            alt={item.title}
            className="object-cover w-full h-full"
            onLoad={handleImageLoad}
            onError={() => setLoading(false)}
          />
        </AspectRatio>
        
        {item.rating && (
          <div className="absolute top-2 right-2 flex items-center bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-xs">
            <Star className="w-3 h-3 mr-1" fill="currentColor" />
            {item.rating}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1 text-white">{item.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              isFavorite ? "text-pink-500" : "text-gray-400"
            )}
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
          </Button>
        </div>
        
        <p className="text-xs sm:text-sm line-clamp-2 mt-1 text-gray-300">{item.description}</p>
        
        <div className="mt-3 space-y-2">
          {item.type === 'movie' ? (
            <>
              <div className="flex items-center text-xs">
                <span className="text-gray-400 mr-2">Genre:</span>
                <span className="font-medium text-gray-200">{item.genre}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <span className="text-gray-400 mr-2">Year:</span>
                <span className="font-medium text-gray-200">{item.year}</span>
              </div>
              
              {item.platform && item.platform.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.platform.map((p, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center text-xs">
                <span className="text-gray-400 mr-2">Artist:</span>
                <span className="font-medium text-gray-200">{item.artist}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <span className="text-gray-400 mr-2">Album:</span>
                <span className="font-medium text-gray-200">{item.album}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <span className="text-gray-400 mr-2">Genre:</span>
                <span className="font-medium text-gray-200">{item.genre}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full hover:bg-white/10 text-gray-300"
                >
                  <Info className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View full details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/30 text-white hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            {item.type === 'movie' ? 'Watch' : 'Listen'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
