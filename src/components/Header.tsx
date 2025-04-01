
import React from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  gender: 'male' | 'female' | null;
  activeStep: number;
  username?: string;
  showFullHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeStep, username, showFullHeader = true }) => {
  const isMobile = useIsMobile();
  
  if (!showFullHeader && activeStep <= 2) {
    return (
      <header className="fixed top-0 left-0 right-0 z-10 px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 bg-transparent">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
              Moodster Mix
            </span>
          </div>
        </div>
      </header>
    );
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-br from-white via-gray-300 to-gray-100 bg-clip-text text-transparent">
            Moodster Mix
          </span>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {activeStep >= 3 && (
            <>
              <Film className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              <Music className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
            </>
          )}
          
          {username && (
            <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-pink-400" />
              <span className="text-xs sm:text-sm font-medium text-white">{username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
