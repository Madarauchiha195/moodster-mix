
import React from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import GenreCarousel from './GenreCarousel';
import { OrganizedContent } from '@/hooks/useRecommendations';

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

  return (
    <div className="space-y-6">
      {/* Featured section */}
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

      {/* Genre-based sections */}
      {movieGenres.map((genre) => genre && (
        <GenreCarousel
          key={genre}
          id={`genre-carousel-${genre.replace(/\s+/g, '-').toLowerCase()}`}
          title={genre}
          subtitle="Movies"
          items={moviesByGenre[genre] || []}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      ))}
    </div>
  );
};

export default MovieRecommendations;
