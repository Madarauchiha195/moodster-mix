
import React from 'react';

interface MusicDetailsProps {
  artist?: string;
  album?: string;
  genre?: string;
}

const MusicDetails: React.FC<MusicDetailsProps> = ({ 
  artist, 
  album, 
  genre 
}) => {
  return (
    <>
      <div className="flex items-center text-xs">
        <span className="text-gray-400 mr-2">Artist:</span>
        <span className="font-medium text-gray-200">{artist}</span>
      </div>
      
      <div className="flex items-center text-xs">
        <span className="text-gray-400 mr-2">Album:</span>
        <span className="font-medium text-gray-200">{album}</span>
      </div>
      
      <div className="flex items-center text-xs">
        <span className="text-gray-400 mr-2">Genre:</span>
        <span className="font-medium text-gray-200">{genre}</span>
      </div>
    </>
  );
};

export default MusicDetails;
