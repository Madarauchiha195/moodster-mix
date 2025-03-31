
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
      <div className="flex justify-center mb-6">
        <div className={cn(
          "flex rounded-full p-1",
          gender === 'male' ? "bg-mood-male-dark" : "bg-mood-female-secondary"
        )}>
          <button
            onClick={() => setActiveTab('movies')}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-full transition-all",
              activeTab === 'movies' && gender === 'male' ? "bg-mood-male-primary text-white" : "",
              activeTab === 'movies' && gender === 'female' ? "bg-mood-female-primary text-white" : "",
              activeTab !== 'movies' && gender === 'male' ? "text-gray-300 hover:text-white" : "",
              activeTab !== 'movies' && gender === 'female' ? "text-gray-600 hover:text-gray-800" : ""
            )}
          >
            Movies & Shows
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-full transition-all",
              activeTab === 'music' && gender === 'male' ? "bg-mood-male-primary text-white" : "",
              activeTab === 'music' && gender === 'female' ? "bg-mood-female-primary text-white" : "",
              activeTab !== 'music' && gender === 'male' ? "text-gray-300 hover:text-white" : "",
              activeTab !== 'music' && gender === 'female' ? "text-gray-600 hover:text-gray-800" : ""
            )}
          >
            Music
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <h2 className={cn(
          "text-2xl font-bold mb-6 pl-4",
          gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
        )}>
          {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
          {mood && 
            <span className="ml-2 text-lg opacity-70">
              for your {mood} mood
            </span>
          }
        </h2>
        
        <div className="skewed-grid relative overflow-hidden">
          <div className="bento-grid unskewed-content">
            {activeTab === 'movies' && movies.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "bento-cell", 
                  index < 2 ? "bento-cell-large" : ""
                )}
              >
                <ContentCard item={item} gender={gender} />
              </div>
            ))}
            
            {activeTab === 'music' && music.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "bento-cell", 
                  index < 2 ? "bento-cell-large" : ""
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
