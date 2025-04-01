
import React from 'react';
import { cn } from '@/lib/utils';
import ContentCard, { ContentItemProps } from './ContentCard';
import { MoodType } from './MoodSelection';

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
            <span className="ml-2 text-sm sm:text-lg opacity-70 text-white">
              for your {mood} mood
            </span>
          }
        </h2>
        
        <div className="relative">
          <div className="overflow-x-auto pb-6 scrollbar-hide">
            <div className={cn(
              "grid grid-flow-col auto-cols-max gap-3 sm:gap-4 p-2 sm:p-4",
              activeTab === 'movies' ? "md:auto-cols-[280px]" : "md:auto-cols-[260px]"
            )}>
              {activeTab === 'movies' && movies.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <ContentCard item={item} gender={gender} />
                </div>
              ))}
              
              {activeTab === 'music' && music.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <ContentCard item={item} gender={gender} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendations;
