
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
      const scrollAmount = direction === 'left' ? -500 : 500;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
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
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/70 hover:bg-purple-900/80 text-white"
          onClick={() => scrollCarousel('featured-carousel', 'left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/70 hover:bg-purple-900/80 text-white"
          onClick={() => scrollCarousel('featured-carousel', 'right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
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
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/70 hover:bg-purple-900/80 text-white"
            onClick={() => scrollCarousel(`genre-carousel-${genre.replace(/\s+/g, '-').toLowerCase()}`, 'left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/70 hover:bg-purple-900/80 text-white"
            onClick={() => scrollCarousel(`genre-carousel-${genre.replace(/\s+/g, '-').toLowerCase()}`, 'right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MovieRecommendations;
