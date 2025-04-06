
import { useState, useEffect } from 'react';
import { ContentItemProps } from '@/components/ContentCard';
import { MoodType } from '@/components/MoodSelection';
import { getRecommendedContent } from '@/data/recommendations';
import { supabase } from "@/integrations/supabase/client";

export interface OrganizedContent {
  movieGenres: string[];
  moviesByGenre: Record<string, ContentItemProps[]>;
  songArtists: string[];
  songsByArtist: Record<string, ContentItemProps[]>;
  movies: ContentItemProps[];
  music: ContentItemProps[];
}

// Define interfaces for our database tables to help TypeScript
interface MovieRecord {
  id: number;
  title: string;
  description: string;
  image_url: string;
  genre: string;
  year: number;
  rating: number;
  platform: string[];
}

interface SongRecord {
  id: number;
  title: string;
  description: string;
  image_url: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
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
    const fetchContent = async () => {
      try {
        // Attempt to fetch from Supabase with type assertions
        const moviesResult = await supabase.from('movies' as unknown as never).select('*');
        const songsResult = await supabase.from('songs' as unknown as never).select('*');

        // Check if we got data from Supabase
        if (
          !moviesResult.error && 
          !songsResult.error && 
          moviesResult.data && 
          songsResult.data &&
          moviesResult.data.length > 0 &&
          songsResult.data.length > 0
        ) {
          // Transform DB data to ContentItemProps
          const movies: ContentItemProps[] = (moviesResult.data as unknown as MovieRecord[]).map(movie => ({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            imageUrl: movie.image_url,
            type: 'movie',
            rating: movie.rating,
            genre: movie.genre,
            year: movie.year,
            platform: movie.platform
          }));

          const music: ContentItemProps[] = (songsResult.data as unknown as SongRecord[]).map(song => ({
            id: song.id,
            title: song.title,
            description: song.description,
            imageUrl: song.image_url,
            type: 'song',
            artist: song.artist,
            album: song.album,
            genre: song.genre,
            year: song.year
          }));

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
          
          console.log("Using Supabase data:", { movies: movies.length, music: music.length });
        } else {
          // Fallback to local data if Supabase fetch fails
          fallbackToLocalData();
          console.log("Using local data due to Supabase fetch error:", 
            moviesResult.error || songsResult.error || "No data available");
        }
      } catch (error) {
        console.error("Error fetching from Supabase:", error);
        fallbackToLocalData();
      }
    };

    // Fallback to local data function
    const fallbackToLocalData = () => {
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
    };

    fetchContent();
  }, [mood]);

  return organizedContent;
}
