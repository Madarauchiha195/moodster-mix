
import { useState, useEffect } from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import { getRecommendedContent } from '@/data/recommendations';

export interface OrganizedContent {
  movieGenres: string[];
  moviesByGenre: Record<string, ContentItemProps[]>;
  songArtists: string[];
  songsByArtist: Record<string, ContentItemProps[]>;
  movies: ContentItemProps[];
  music: ContentItemProps[];
}

export function useRecommendations(mood: MoodType): OrganizedContent {
  const [organizedContent, setOrganizedContent] = useState<OrganizedContent>({
    movieGenres: [],
    moviesByGenre: {},
    songArtists: [],
    songsByArtist: {},
    movies: [],
    music: []
  });

  useEffect(() => {
    // Get content recommendations based on mood
    const recommendedContent = getRecommendedContent(mood);
    
    const movies = recommendedContent.filter(item => item.type === 'movie');
    const music = recommendedContent.filter(item => item.type === 'song');

    // Organize movies by genres
    const movieGenres = [...new Set(movies.map(movie => movie.genre).filter(Boolean)
      .flatMap(genre => genre ? genre.split(', ') : []))];
    
    const moviesByGenre = movieGenres.reduce((acc, genre) => {
      if (genre) {
        acc[genre] = movies.filter(movie => movie.genre?.includes(genre));
      }
      return acc;
    }, {} as Record<string, ContentItemProps[]>);

    // Organize songs by artists
    const songArtists = [...new Set(music.map(song => song.artist).filter(Boolean))];
    const songsByArtist = songArtists.reduce((acc, artist) => {
      if (artist) {
        acc[artist] = music.filter(song => song.artist === artist);
      }
      return acc;
    }, {} as Record<string, ContentItemProps[]>);

    setOrganizedContent({
      movieGenres,
      moviesByGenre,
      songArtists,
      songsByArtist,
      movies,
      music
    });
  }, [mood]);

  return organizedContent;
}
