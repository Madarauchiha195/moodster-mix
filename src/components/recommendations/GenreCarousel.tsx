
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import ContentCard from '@/components/ContentCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GenreCarouselProps {
  id: string;
  title: string;
  subtitle?: string;
  items: ContentItemProps[];
  gender: 'male' | 'female';
  onOpenDetails: (item: ContentItemProps) => void;
  onLike: (item: ContentItemProps) => void;
  likedContent: ContentItemProps[];
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({ 
  id, 
  title, 
  subtitle, 
  items, 
  gender, 
  onOpenDetails, 
  onLike, 
  likedContent 
}) => {
  // Check if an item is liked
  const isItemLiked = (item: ContentItemProps) => {
    return likedContent.some(likedItem => likedItem.id === item.id);
  };

  return (
    <div className="mb-8 relative">
      <h3 className="text-lg font-bold mb-3 pl-2 text-white tracking-wide">
        {title}
        {subtitle && <span className="text-sm text-gray-300 ml-2">{subtitle}</span>}
      </h3>
      <Carousel
        id={id}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full mx-auto relative px-4 md:px-8"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/7 xl:basis-1/8 2xl:basis-1/10">
              <div className="px-1">
                <ContentCard 
                  item={item} 
                  gender={gender} 
                  onOpenDetails={onOpenDetails} 
                  onLike={onLike}
                  isLiked={isItemLiked(item)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start z-10 pointer-events-none">
          <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
          <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
};

export default GenreCarousel;
