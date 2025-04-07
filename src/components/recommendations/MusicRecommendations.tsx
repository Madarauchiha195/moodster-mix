
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

  // Generate mood-specific group names based on the current mood
  const getMoodGroupNames = (currentMood: MoodType) => {
    switch(currentMood) {
      case 'happy':
        return ['Upbeat Hits', 'Feel Good Classics', 'Party Favorites'];
      case 'sad':
        return ['Melancholy Melodies', 'Reflective Tunes', 'Soulful Ballads'];
      case 'confused':
        return ['Mind-Opening Tracks', 'Thought Provokers', 'Clarity Seekers'];
      case 'neutral':
        return ['Chill Vibes', 'Smooth Sounds', 'Easy Listening'];
      default:
        return ['Top Picks', 'Recent Hits', 'Editor\'s Choice'];
    }
  };

  const moodGroups = getMoodGroupNames(mood);

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

  // Split music into different groups to create more variety
  const splitIntoGroups = () => {
    if (!music.length) return {};
    
    // Make copies so we can shuffle and distribute differently
    const shuffled = [...music].sort(() => Math.random() - 0.5);
    const third = Math.ceil(shuffled.length / 3);
    
    return {
      group1: shuffled.slice(0, third),
      group2: shuffled.slice(third, third * 2),
      group3: shuffled.slice(third * 2)
    };
  };

  const musicGroups = splitIntoGroups();

  return (
    <div className="space-y-1">
      {/* Featured music section */}
      <div className="relative group">
        <GenreCarousel
          id="music-top-picks"
          title={moodGroups[0]}
          subtitle={`for your ${mood} mood`}
          items={music.slice(0, 20)}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      {/* Additional mood-specific groups */}
      <div className="relative group">
        <GenreCarousel
          id="music-group-1"
          title={moodGroups[1]}
          items={musicGroups.group1 || music.slice(15, 35)}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      <div className="relative group">
        <GenreCarousel
          id="music-group-2"
          title={moodGroups[2]}
          items={musicGroups.group2 || music.slice(30, 50)}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      </div>

      {/* Show all music */}
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
