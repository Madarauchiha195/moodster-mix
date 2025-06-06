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

  // Function to manually scroll the carousel to the right
  const scrollCarouselRight = () => {
    const carouselContent = document.querySelector(`#${id} .embla__container`);
    if (carouselContent) {
      carouselContent.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
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
        <CarouselContent className="gap-3">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-auto">
              <div className="p-2">
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
          <CarouselPrevious className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-gradient-to-r from-purple-700/80 to-indigo-700/80 hover:from-purple-600 hover:to-indigo-600 border-none shadow-lg rounded-full text-white hover:text-white" />
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end z-10 pointer-events-none">
          <CarouselNext className="static pointer-events-auto h-9 w-9 lg:h-10 lg:w-10 bg-gradient-to-r from-purple-700/80 to-indigo-700/80 hover:from-purple-600 hover:to-indigo-600 border-none shadow-lg rounded-full text-white hover:text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default GenreCarousel;
