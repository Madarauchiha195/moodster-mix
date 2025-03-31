
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

interface ThemeSelectionProps {
  onSelectTheme: (theme: 'male' | 'female') => void;
  selectedTheme: 'male' | 'female' | null;
}

const ThemeSelection: React.FC<ThemeSelectionProps> = ({ 
  onSelectTheme, 
  selectedTheme 
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Select Your Theme</h2>
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "flex flex-col items-center justify-center h-40 w-40 transition-all duration-300",
            "bg-black border border-gray-800 text-white",
            selectedTheme === 'male' ? 
              "border-indigo-500 border-2" : 
              "hover:border-indigo-500 hover:border-2"
          )}
          onClick={() => onSelectTheme('male')}
        >
          <Sun 
            size={48} 
            className={cn(
              "mb-2",
              selectedTheme === 'male' ? "text-indigo-400" : "text-gray-400"
            )} 
          />
          <span className={selectedTheme === 'male' ? "text-indigo-400" : "text-gray-300"}>
            Blue Theme
          </span>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "flex flex-col items-center justify-center h-40 w-40 transition-all duration-300",
            "bg-black border border-gray-800 text-white",
            selectedTheme === 'female' ? 
              "border-purple-500 border-2" : 
              "hover:border-purple-500 hover:border-2"
          )}
          onClick={() => onSelectTheme('female')}
        >
          <Moon
            size={48} 
            className={cn(
              "mb-2",
              selectedTheme === 'female' ? "text-purple-400" : "text-gray-400"
            )} 
          />
          <span className={selectedTheme === 'female' ? "text-purple-400" : "text-gray-300"}>
            Purple Theme
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelection;
