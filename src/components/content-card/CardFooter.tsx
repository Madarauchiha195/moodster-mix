
import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CardFooterProps {
  type: 'movie' | 'song';
  onDetailsClick: (e: React.MouseEvent) => void;
  onExternalLinkClick: (e: React.MouseEvent) => void;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  type, 
  onDetailsClick, 
  onExternalLinkClick 
}) => {
  return (
    <div className="mt-4 flex justify-between gap-2 items-center">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 rounded-full hover:bg-purple-900/30 text-gray-300 hover:text-white transition-colors duration-300"
        onClick={onDetailsClick}
      >
        <Info className="h-4 w-4 mr-1" />
        Details
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="h-8 rounded-full bg-gradient-to-r from-indigo-900/80 to-purple-900/80 hover:from-indigo-600 hover:to-purple-600 border-purple-500/30 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        onClick={onExternalLinkClick}
      >
        <ExternalLink className="h-4 w-4 mr-1" />
        {type === 'movie' ? 'Watch' : 'Listen'}
      </Button>
    </div>
  );
};

export default CardFooter;
