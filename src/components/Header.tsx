
import React from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, HeartPulse, User } from 'lucide-react';

interface HeaderProps {
  gender: 'male' | 'female' | null;
  activeStep: number;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ activeStep, username }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-4 py-3 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-blue-500/20">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight text-white">Moodster Mix</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {activeStep >= 3 && (
            <>
              <Film className="h-5 w-5 text-blue-500" />
              <Music className="h-5 w-5 text-blue-500" />
            </>
          )}
          
          {username && (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <User className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-white">{username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
