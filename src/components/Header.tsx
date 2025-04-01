
import React from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, HeartPulse, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  gender: 'male' | 'female' | null;
  activeStep: number;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ activeStep, username }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-blue-500/20">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-white">Moodster Mix</span>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {activeStep >= 3 && (
            <>
              <Film className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <Music className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            </>
          )}
          
          {username && (
            <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="text-xs sm:text-sm font-medium text-white">{username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
