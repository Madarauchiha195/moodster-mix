
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

  return (
    <div className="space-y-8">
      {/* Featured music section */}
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

      {/* Artist-based sections */}
      {songArtists.map((artist) => artist && (
        <GenreCarousel
          key={artist}
          id={`artist-carousel-${artist.replace(/\s+/g, '-').toLowerCase()}`}
          title={artist}
          items={songsByArtist[artist] || []}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      ))}
    </div>
  );
};

export default MusicRecommendations;
