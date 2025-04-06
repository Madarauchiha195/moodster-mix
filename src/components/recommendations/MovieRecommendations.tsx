
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import GenreCarousel from './GenreCarousel';
import { OrganizedContent } from '@/hooks/useRecommendations';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRecommendationsProps {
  content: OrganizedContent;
  gender: 'male' | 'female';
  onOpenDetails: (item: ContentItemProps) => void;
  onLike: (item: ContentItemProps) => void;
  likedContent: ContentItemProps[];
  mood: MoodType;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ 
  content, 
  gender, 
  onOpenDetails, 
  onLike, 
  likedContent,
  mood
}) => {
  const { movieGenres, moviesByGenre, movies } = content;

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
      {/* Featured section */}
      <div className="relative group">
        <GenreCarousel
          id="featured-carousel"
          title="Featured" 
          subtitle="Top picks for you"
          items={movies.slice(0, 12)}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      {/* Genre-based sections */}
      {movieGenres.map((genre) => genre && (
        <div key={genre} className="relative group">
          <GenreCarousel
            id={`genre-carousel-${genre.replace(/\s+/g, '-').toLowerCase()}`}
            title={genre}
            subtitle="Movies"
            items={moviesByGenre[genre] || []}
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

export default MovieRecommendations;
