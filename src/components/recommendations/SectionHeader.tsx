
import React from 'react';
import { cn } from '@/lib/utils';
import { MoodType } from '@/components/MoodSelection';

interface SectionHeaderProps {
  activeTab: 'movies' | 'music';
  onTabChange: (tab: 'movies' | 'music') => void;
  mood: MoodType;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ activeTab, onTabChange, mood }) => {
  return (
    <div className="flex justify-between mb-4 sm:mb-6">
      <div className="flex rounded-full p-1 bg-black/40 backdrop-blur-sm">
        <button
          onClick={() => onTabChange('movies')}
          className={cn(
            "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
            activeTab === 'movies' ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "",
            activeTab !== 'movies' ? "text-gray-300 hover:text-white" : ""
          )}
        >
          Movies & Shows
        </button>
        <button
          onClick={() => onTabChange('music')}
          className={cn(
            "px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all",
            activeTab === 'music' ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "",
            activeTab !== 'music' ? "text-gray-300 hover:text-white" : ""
          )}
        >
          Music
        </button>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold pl-2 sm:pl-4 bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
        {activeTab === 'movies' ? 'Recommended Movies & Shows' : 'Recommended Music'}
        <span className="text-xl sm:text-2xl ml-2 opacity-70 text-white">
          for your {mood} mood
        </span>
      </h2>
    </div>
  );
};

export default SectionHeader;
