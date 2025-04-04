
import React, { useState, useEffect } from 'react';
import { ContentItemProps } from './ContentCard';
import { MoodType } from './MoodSelection';
import { ScrollArea } from './ui/scroll-area';
import { ExpandableCard } from './ui/expandable-card';
import SharedPlaylistCreator from './SharedPlaylistCreator';
import SectionHeader from './recommendations/SectionHeader';
import MovieRecommendations from './recommendations/MovieRecommendations';
import MusicRecommendations from './recommendations/MusicRecommendations';
import { useRecommendations } from '@/hooks/useRecommendations';

interface ContentRecommendationsProps {
  mood: MoodType;
  gender: 'male' | 'female';
  onLikeContent?: (item: ContentItemProps) => void;
  likedContent: ContentItemProps[];
  username: string;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({ 
  mood,
  gender,
  onLikeContent,
  likedContent = [],
  username
}) => {
  // Retrieve the last active tab from localStorage or default to 'movies'
  const [activeTab, setActiveTab] = useState<'movies' | 'music'>(() => {
    const savedTab = localStorage.getItem('moodsterActiveTab');
    return (savedTab as 'movies' | 'music') || 'movies';
  });
  const [activeItem, setActiveItem] = useState<ContentItemProps | null>(null);
  
  // Get organized content using custom hook
  const content = useRecommendations(mood);
  
  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moodsterActiveTab', activeTab);
  }, [activeTab]);
  
  const handleOpenDetails = (item: ContentItemProps) => {
    setActiveItem(item);
  };

  const handleCloseDetails = () => {
    setActiveItem(null);
  };

  const handleLike = (item: ContentItemProps) => {
    if (onLikeContent) {
      onLikeContent(item);
    }
  };
  
  const handlePlaylistCreated = (playlistId: string) => {
    console.log('Playlist created with ID:', playlistId);
  };

  return (
    <ScrollArea className="w-full h-[calc(100vh-120px)] overflow-y-auto">
      <div className="w-full px-2 pb-12">
        <div className="flex justify-between mb-4 sm:mb-6">
          <div className="flex rounded-full p-1 bg-black/40 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('movies')}
              className={activeTab === 'movies' 
                ? "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                : "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all text-gray-300 hover:text-white"}
            >
              Movies & Shows
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={activeTab === 'music' 
                ? "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                : "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all text-gray-300 hover:text-white"}
            >
              Music
            </button>
          </div>
          
          {/* Add playlist creator */}
          <SharedPlaylistCreator 
            username={username}
            currentMood={mood}
            contentItems={content.movies.concat(content.music)}
            onPlaylistCreated={handlePlaylistCreated}
          />
        </div>
        
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pl-2 sm:pl-4 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
            {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
            <span className="text-xl sm:text-2xl ml-2 opacity-70 text-white">
              for your {mood} mood
            </span>
          </h2>
          
          {activeTab === 'movies' ? (
            <MovieRecommendations
              content={content}
              gender={gender}
              onOpenDetails={handleOpenDetails}
              onLike={handleLike}
              likedContent={likedContent}
              mood={mood}
            />
          ) : (
            <MusicRecommendations
              content={content}
              gender={gender}
              onOpenDetails={handleOpenDetails}
              onLike={handleLike}
              likedContent={likedContent}
              mood={mood}
            />
          )}
        </div>
      </div>
      
      {/* Expandable Card */}
      <ExpandableCard 
        activeItem={activeItem} 
        onClose={handleCloseDetails} 
        onLike={handleLike}
        isLiked={activeItem ? likedContent.some(item => item.id === activeItem.id) : false}
      />
    </ScrollArea>
  );
};

export default ContentRecommendations;
