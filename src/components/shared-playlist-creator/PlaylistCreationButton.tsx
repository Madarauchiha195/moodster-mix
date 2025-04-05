
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface PlaylistCreationButtonProps {
  isCreating: boolean;
  onClick: () => void;
  disabled: boolean;
}

const PlaylistCreationButton: React.FC<PlaylistCreationButtonProps> = ({ 
  isCreating, 
  onClick, 
  disabled 
}) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={disabled || isCreating}
      className="bg-purple-600 hover:bg-purple-700"
    >
      {isCreating ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </>
      )}
    </Button>
  );
};

export default PlaylistCreationButton;
