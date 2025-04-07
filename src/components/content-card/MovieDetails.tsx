
import React from 'react';

interface MovieDetailsProps {
  genre?: string;
  year?: number;
  platform?: string[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ 
  genre, 
  year, 
  platform 
}) => {
  return (
    <>
      <div className="flex items-center text-xs">
        <span className="text-gray-400 mr-2">Genre:</span>
        <span className="font-medium text-gray-200">{genre}</span>
      </div>
      
      <div className="flex items-center text-xs">
        <span className="text-gray-400 mr-2">Year:</span>
        <span className="font-medium text-gray-200">{year}</span>
      </div>
      
      {platform && platform.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {platform.map((p, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default MovieDetails;
