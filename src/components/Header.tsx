
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
  
  const metalicTextStyle = {
    textShadow: '0 0 10px rgba(255,255,255,0.3)',
    background: 'linear-gradient(to bottom, #fff, #999)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  };
  
  // For mood selection and profile setup pages, show minimal header
  if (activeStep <= 2) {
    return (
      <header className="fixed top-0 left-0 right-0 z-10 px-4 py-3 transition-all duration-300 bg-transparent">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl tracking-tight" style={metalicTextStyle}>
              Moodster Mix
            </span>
          </div>
        </div>
      </header>
    );
  }
  
  // For content recommendation page, show full header
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-4 py-3 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-purple-500/20">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl tracking-tight" style={metalicTextStyle}>
            Moodster Mix
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {activeStep >= 3 && (
            <>
              <Film className="h-5 w-5 text-purple-400" />
              <Music className="h-5 w-5 text-pink-400" />
            </>
          )}
          
          {username && (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <User className="h-4 w-4 text-pink-400" />
              <span className="text-sm font-medium text-white">{username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
