
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CardHeaderProps {
  title: string;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent) => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  isFavorite, 
  toggleFavorite 
}) => {
  return (
    <div className="flex justify-between items-start">
      <h3 
        className="text-md font-semibold line-clamp-1 text-white"
      >
        {title}
      </h3>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-transform hover:scale-110",
          isFavorite ? "text-pink-500" : "text-gray-400 hover:text-pink-300"
        )}
        onClick={toggleFavorite}
      >
        <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
      </Button>
    </div>
  );
};

export default CardHeader;
