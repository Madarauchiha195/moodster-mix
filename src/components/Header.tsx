
import React from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, HeartPulse, User } from 'lucide-react';

interface HeaderProps {
  gender: 'male' | 'female' | null;
  activeStep: number;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ gender, activeStep, username }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-10 px-4 py-3 transition-all duration-300",
      gender === 'male' ? "bg-mood-male-dark/95 text-white" : 
      gender === 'female' ? "bg-gradient-to-r from-mood-female-secondary to-mood-female-light text-mood-male-dark" :
      "bg-background"
    )}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulse className={cn(
            "h-6 w-6",
            gender === 'male' ? "text-mood-male-primary" : 
            gender === 'female' ? "text-mood-female-primary" : ""
          )} />
          <span className="font-bold text-xl tracking-tight">Moodster Mix</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {activeStep >= 3 && (
            <>
              <Film className={cn(
                "h-5 w-5", 
                gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
              )} />
              <Music className={cn(
                "h-5 w-5", 
                gender === 'male' ? "text-mood-male-primary" : "text-mood-female-primary"
              )} />
            </>
          )}
          
          {username && (
            <div className={cn(
              "flex items-center space-x-2 px-3 py-1 rounded-full",
              gender === 'male' ? "bg-mood-male-primary/20" : "bg-mood-female-primary/20"
            )}>
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
