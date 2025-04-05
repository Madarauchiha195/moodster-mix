
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, ExternalLink, Star, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';
import { toast } from "sonner";

// Default images for different content types
const DEFAULT_MOVIE_IMAGES = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Movie popcorn
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Theater
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Film reel
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" // Clapperboard
];

const DEFAULT_MUSIC_IMAGES = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Music studio
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Colorful music
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Vinyl record
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" // Concert
];

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
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback URLs based on content type
      if (item.type === 'movie') {
        const platformUrl = item.platform && item.platform.length > 0 
          ? getPlatformUrl(item.platform[0], item.title)
          : `https://www.google.com/search?q=watch+${encodeURIComponent(item.title)}`;
        window.open(platformUrl, '_blank', 'noopener,noreferrer');
      } else {
        const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(item.title + ' ' + (item.artist || ''))}`;
        window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };
  
  // Get a fallback image for content without images
  const getFallbackImage = () => {
    const seed = item.id.toString().charCodeAt(0) || 0;
    const defaultImages = item.type === 'movie' ? DEFAULT_MOVIE_IMAGES : DEFAULT_MUSIC_IMAGES;
    const index = seed % defaultImages.length;
    return defaultImages[index];
  };
  
  // Try to get a better image for the content
  const getEnhancedImageUrl = () => {
    if (item.imageUrl && !item.imageUrl.includes('unsplash.com/random')) {
      return item.imageUrl;
    }
    
    // For movies, construct a potential movie poster URL
    if (item.type === 'movie') {
      // The actual implementation would ideally use a movie API
      return `https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
    } 
    
    // For music, try to get album art
    if (item.type === 'song' && item.artist && item.title) {
      // The actual implementation would ideally use a music API
      return `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
    }
    
    // Fallback to a themed image if all else fails
    return getFallbackImage();
  };

  const getPlatformUrl = (platform: string, title: string) => {
    const query = encodeURIComponent(title);
    switch (platform.toLowerCase()) {
      case 'netflix':
        return `https://www.netflix.com/search?q=${query}`;
      case 'amazon':
      case 'prime':
      case 'amazon prime':
        return `https://www.amazon.com/s?k=${query}&i=instant-video`;
      case 'hulu':
        return `https://www.hulu.com/search?q=${query}`;
      case 'disney+':
      case 'disney plus':
        return `https://www.disneyplus.com/search?q=${query}`;
      case 'hbo':
      case 'hbo max':
        return `https://www.max.com/search?q=${query}`;
      case 'apple tv':
      case 'apple tv+':
        return `https://tv.apple.com/search?term=${query}`;
      default:
        return `https://www.google.com/search?q=watch+${query}+on+${platform}`;
    }
  };

  return (
    <div 
      className="content-card h-full bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-500/50 cursor-pointer transition-all duration-300"
      onClick={() => onOpenDetails(item)}
    >
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
            src={getEnhancedImageUrl()}
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
            isFavorite ? "bg-pink-500/20 text-pink-500" : "bg-black/50 text-gray-400 hover:text-pink-300"
          )}
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-3.5 w-3.5", isFavorite ? "fill-current" : "")} />
        </Button>
      </div>
      
      <div className="p-2">
        <h3 
          className="text-sm font-semibold line-clamp-1 text-white"
        >
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
            onClick={handleExternalLink}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {item.type === 'movie' ? 'Watch' : 'Listen'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
