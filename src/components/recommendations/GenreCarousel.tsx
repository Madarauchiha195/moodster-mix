
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import ContentCard from '@/components/ContentCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
    <div className="mb-6 relative">
      <h3 className="text-lg font-bold mb-2 pl-2 text-white tracking-wide">
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
        className="w-full mx-auto relative px-2 md:px-4"
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-1 md:pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7">
              <div className="px-0.5">
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
        <div className="absolute inset-y-0 left-0 w-8 flex items-center justify-start z-10 pointer-events-none">
          <CarouselPrevious className="static pointer-events-auto h-8 w-8 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
        </div>
        <div className="absolute inset-y-0 right-0 w-8 flex items-center justify-end z-10 pointer-events-none">
          <CarouselNext className="static pointer-events-auto h-8 w-8 bg-black/60 hover:bg-black/80 border-purple-500/30 rounded-full" />
        </div>
      </Carousel>
      <Button 
        onClick={() => {
          const carousel = document.getElementById(id);
          if (carousel) {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-gradient-to-r from-purple-700/80 to-indigo-700/80 hover:from-purple-600 hover:to-indigo-600 border-none shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default GenreCarousel;
