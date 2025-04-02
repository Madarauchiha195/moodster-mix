
import React from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  gender: 'male' | 'female' | null;
  activeStep: number;
  username?: string;
  showFullHeader?: boolean;
  onOpenProfile?: () => void;
  onOpenMovies?: () => void;
  onOpenMusic?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  gender, 
  activeStep, 
  username, 
  showFullHeader = true,
  onOpenProfile,
  onOpenMovies,
  onOpenMusic
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const metalicTextStyle = {
    textShadow: '0 0 10px rgba(255,255,255,0.3)',
    background: 'linear-gradient(to bottom, #fff, #999)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  };
  
  const handleLogoClick = () => {
    if (activeStep <= 2) return; // Do nothing on setup pages
    navigate('/app'); // Navigate to main app page
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
          <span 
            className="text-xl sm:text-2xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
            style={metalicTextStyle}
            onClick={handleLogoClick}
          >
            Moodster Mix
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {activeStep >= 3 && (
            <>
              <button 
                onClick={onOpenMovies}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-indigo-900/40 to-indigo-800/40 border border-indigo-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                title="My Movies & Shows"
              >
                <Film className="h-4 w-4 text-indigo-300" />
              </button>
              <button 
                onClick={onOpenMusic}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                title="My Music"
              >
                <Music className="h-4 w-4 text-purple-300" />
              </button>
            </>
          )}
          
          {username && (
            <button 
              onClick={onOpenProfile}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-purple-500/30 hover:from-indigo-900/30 hover:to-purple-900/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]"
            >
              <User className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-white">{username}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
