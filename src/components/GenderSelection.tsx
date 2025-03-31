
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';  // Using theme-related icons

interface GenderSelectionProps {
  onSelectGender: (gender: 'male' | 'female') => void;
  selectedGender: 'male' | 'female' | null;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ 
  onSelectGender, 
  selectedGender 
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8">Select Your Theme</h2>
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "flex flex-col items-center justify-center h-40 w-40 transition-all duration-300",
            selectedGender === 'male' ? 
              "bg-mood-male-dark text-white border-mood-male-primary border-2" : 
              "hover:border-mood-male-primary hover:border-2"
          )}
          onClick={() => onSelectGender('male')}
        >
          <Sun 
            size={48} 
            className={cn(
              "mb-2",
              selectedGender === 'male' ? "text-mood-male-primary" : ""
            )} 
          />
          <span>Light</span>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "flex flex-col items-center justify-center h-40 w-40 transition-all duration-300",
            selectedGender === 'female' ? 
              "bg-mood-female-secondary text-mood-male-dark border-mood-female-primary border-2" : 
              "hover:border-mood-female-primary hover:border-2"
          )}
          onClick={() => onSelectGender('female')}
        >
          <Moon
            size={48} 
            className={cn(
              "mb-2",
              selectedGender === 'female' ? "text-mood-female-primary" : ""
            )} 
          />
          <span>Dark</span>
        </Button>
      </div>
    </div>
  );
};

export default GenderSelection;
