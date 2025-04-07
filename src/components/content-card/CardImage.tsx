
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star } from 'lucide-react';

interface CardImageProps {
  imageUrl?: string;
  title: string;
  rating?: number;
  onLoad: () => void;
  onError: () => void;
  loading: boolean;
}

const CardImage: React.FC<CardImageProps> = ({ 
  imageUrl, 
  title, 
  rating, 
  onLoad, 
  onError, 
  loading 
}) => {
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
              {title.includes('movie') || title.includes('Movie') ? (
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
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className="object-cover w-full h-full"
          onLoad={onLoad}
          onError={onError}
        />
      </AspectRatio>
      
      {rating && (
        <div 
          className="absolute top-2 right-2 flex items-center bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-xs"
        >
          <Star className="w-3 h-3 mr-1" fill="currentColor" />
          {rating}
        </div>
      )}
    </div>
  );
};

export default CardImage;
