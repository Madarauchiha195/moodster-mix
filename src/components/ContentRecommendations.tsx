
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ContentCard, { ContentItemProps } from './ContentCard';
import { MoodType } from './MoodSelection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExpandableCard } from './ui/expandable-card';

// Sample data for recommendations
import { getRecommendedContent } from '@/data/recommendations';

interface ContentRecommendationsProps {
  mood: MoodType;
  gender: 'male' | 'female';
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({ 
  mood,
  gender
}) => {
  const [activeTab, setActiveTab] = React.useState<'movies' | 'music'>('movies');
  const [activeItem, setActiveItem] = useState<ContentItemProps | null>(null);
  
  // Get content recommendations based on mood
  const recommendedContent = getRecommendedContent(mood);
  
  const movies = recommendedContent.filter(item => item.type === 'movie');
  const music = recommendedContent.filter(item => item.type === 'song');

  const handleOpenDetails = (item: ContentItemProps) => {
    setActiveItem(item);
  };

  const handleCloseDetails = () => {
    setActiveItem(null);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="flex rounded-full p-1 bg-black/40 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('movies')}
            className={cn(
              "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
              activeTab === 'movies' ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "",
              activeTab !== 'movies' ? "text-gray-300 hover:text-white" : ""
            )}
          >
            Movies & Shows
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={cn(
              "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
              activeTab === 'music' ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "",
              activeTab !== 'music' ? "text-gray-300 hover:text-white" : ""
            )}
          >
            Music
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pl-2 sm:pl-4 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
          {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
          {mood && 
            <span className="text-xl sm:text-2xl ml-2 opacity-70 text-white">
              for your {mood} mood
            </span>
          }
        </h2>
        
        <div className="mb-8 px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="gap-4">
              {activeTab === 'movies' && movies.slice(0, 5).map((item) => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <ContentCard item={item} gender={gender} onOpenDetails={handleOpenDetails} />
                </CarouselItem>
              ))}
              
              {activeTab === 'music' && music.slice(0, 5).map((item) => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <ContentCard item={item} gender={gender} onOpenDetails={handleOpenDetails} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
            <CarouselNext className="right-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
          </Carousel>
        </div>

        {/* Second row of content */}
        {activeTab === 'movies' && movies.length > 5 && (
          <div className="mb-8 px-10">
            <h3 className="text-lg font-bold mb-3 pl-2 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
              More Movies For You
            </h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="gap-4">
                {movies.slice(5).map((item) => (
                  <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <ContentCard item={item} gender={gender} onOpenDetails={handleOpenDetails} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
              <CarouselNext className="right-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
            </Carousel>
          </div>
        )}

        {activeTab === 'music' && music.length > 5 && (
          <div className="px-10">
            <h3 className="text-lg font-bold mb-3 pl-2 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
              More Songs For You
            </h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="gap-4">
                {music.slice(5).map((item) => (
                  <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <ContentCard item={item} gender={gender} onOpenDetails={handleOpenDetails} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
              <CarouselNext className="right-2 absolute bg-black/40 hover:bg-black/60 border-purple-500/30 rounded-full" />
            </Carousel>
          </div>
        )}
      </div>
      
      {/* Expandable Card */}
      <ExpandableCard activeItem={activeItem} onClose={handleCloseDetails} />
    </div>
  );
};

export default ContentRecommendations;
