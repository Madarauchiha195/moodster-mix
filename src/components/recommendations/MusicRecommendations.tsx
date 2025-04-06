
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import GenreCarousel from './GenreCarousel';
import { OrganizedContent } from '@/hooks/useRecommendations';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Function to scroll carousel horizontally
  const scrollCarousel = (id: string, direction: 'left' | 'right') => {
    const carousel = document.getElementById(id);
    if (carousel) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
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

      {/* Artist-based sections */}
      {songArtists.map((artist) => artist && (
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
