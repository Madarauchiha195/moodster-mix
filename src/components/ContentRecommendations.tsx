
import React from 'react';
import { cn } from '@/lib/utils';
import ContentCard, { ContentItemProps } from './ContentCard';
import { MoodType } from './MoodSelection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  
  // Get content recommendations based on mood
  const recommendedContent = getRecommendedContent(mood);
  
  const movies = recommendedContent.filter(item => item.type === 'movie');
  const music = recommendedContent.filter(item => item.type === 'song');

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
        
        <div className="mb-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {activeTab === 'movies' && movies.slice(0, 5).map((item) => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1">
                  <ContentCard item={item} gender={gender} />
                </CarouselItem>
              ))}
              
              {activeTab === 'music' && music.slice(0, 5).map((item) => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1">
                  <ContentCard item={item} gender={gender} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
            <CarouselNext className="right-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
          </Carousel>
        </div>

        {/* Second row of content */}
        {activeTab === 'movies' && movies.length > 5 && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3 pl-2 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
              More Movies For You
            </h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {movies.slice(5).map((item) => (
                  <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1">
                    <ContentCard item={item} gender={gender} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
              <CarouselNext className="right-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
            </Carousel>
          </div>
        )}

        {activeTab === 'music' && music.length > 5 && (
          <div>
            <h3 className="text-lg font-bold mb-3 pl-2 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
              More Songs For You
            </h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {music.slice(5).map((item) => (
                  <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1">
                    <ContentCard item={item} gender={gender} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
              <CarouselNext className="right-2 bg-black/40 hover:bg-black/60 border-purple-500/30" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentRecommendations;
