
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

  const isDarkMode = gender === 'female';

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className={cn(
          "flex rounded-full p-1",
          isDarkMode ? "bg-gray-800" : "bg-mood-male-dark"
        )}>
          <button
            onClick={() => setActiveTab('movies')}
            className={cn(
              "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
              activeTab === 'movies' && !isDarkMode ? "bg-mood-male-primary text-white" : "",
              activeTab === 'movies' && isDarkMode ? "bg-mood-female-primary text-white" : "",
              activeTab !== 'movies' ? "text-gray-300 hover:text-white" : ""
            )}
          >
            Movies & Shows
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={cn(
              "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
              activeTab === 'music' && !isDarkMode ? "bg-mood-male-primary text-white" : "",
              activeTab === 'music' && isDarkMode ? "bg-mood-female-primary text-white" : "",
              activeTab !== 'music' ? "text-gray-300 hover:text-white" : ""
            )}
          >
            Music
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <h2 className={cn(
          "text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pl-2 sm:pl-4",
          isDarkMode ? "text-mood-female-primary" : "text-mood-male-primary"
        )}>
          {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
          {mood && 
            <span className="ml-2 text-sm sm:text-lg opacity-70">
              for your {mood} mood
            </span>
          }
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4">
            {activeTab === 'movies' && movies.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                  index < 2 ? "md:col-span-2 md:row-span-2" : ""
                )}
              >
                <ContentCard item={item} gender={gender} />
              </div>
            ))}
            
            {activeTab === 'music' && music.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg", 
                  index < 2 ? "md:col-span-2 md:row-span-2" : ""
                )}
              >
                <ContentCard item={item} gender={gender} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendations;
