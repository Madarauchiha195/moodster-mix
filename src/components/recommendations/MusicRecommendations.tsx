
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import GenreCarousel from './GenreCarousel';
import { OrganizedContent } from '@/hooks/useRecommendations';

interface MusicRecommendationsProps {
  content: OrganizedContent;
  gender: 'male' | 'female';
  onOpenDetails: (item: ContentItemProps) => void;
  onLike: (item: ContentItemProps) => void;
  likedContent: ContentItemProps[];
  mood: MoodType;
}

const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ 
  content, 
  gender, 
  onOpenDetails, 
  onLike, 
  likedContent,
  mood
}) => {
  const { songArtists, songsByArtist, music } = content;

  // Check if we have music content
  const hasMusicContent = music && music.length > 0;
  const hasArtists = songArtists && songArtists.length > 0;

  if (!hasMusicContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-lg">No music recommendations available for your current mood.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Featured music section */}
      <div className="relative group">
        <GenreCarousel
          id="music-top-picks"
          title="Top Picks"
          subtitle="for you"
          items={music.slice(0, 12)}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      {/* Show music by genre if available */}
      <div className="relative group">
        <GenreCarousel
          id="music-genre-all"
          title="All Music"
          items={music}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      {/* Artist-based sections */}
      {hasArtists && songArtists.map((artist) => artist && (
        <div key={artist} className="relative group">
          <GenreCarousel
            id={`artist-carousel-${artist.replace(/\s+/g, '-').toLowerCase()}`}
            title={artist}
            items={songsByArtist[artist] || []}
            gender={gender}
            onOpenDetails={onOpenDetails}
            onLike={onLike}
            likedContent={likedContent}
          />
        </div>
      ))}
    </div>
  );
};

export default MusicRecommendations;
