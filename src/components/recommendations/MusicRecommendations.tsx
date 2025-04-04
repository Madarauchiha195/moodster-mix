
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

  // Additional song data based on different genres
  const additionalSongs: ContentItemProps[] = [
    // Pop songs
    {
      id: 1001,
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      description: "A catchy pop song with Caribbean influences that became one of the biggest hits of 2017.",
      imageUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop",
      year: 2017,
      rating: 4.5
    },
    {
      id: 1002,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      description: "An upbeat synth-pop and new wave track influenced by 1980s music.",
      imageUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/R&B",
      year: 2019,
      rating: 4.8
    },
    {
      id: 1003,
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      description: "A minimalist electronic and trap-influenced pop song with a catchy bass line.",
      imageUrl: "https://images.unsplash.com/photo-1568607689150-2212f0fe75e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Electropop",
      year: 2019,
      rating: 4.7
    },
    // Hip-Hop/Rap songs
    {
      id: 1004,
      title: "SICKO MODE",
      artist: "Travis Scott",
      album: "Astroworld",
      description: "An experimental hip-hop song featuring multiple beat changes and guest appearances.",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop/Rap",
      year: 2018,
      rating: 4.6
    },
    {
      id: 1005,
      title: "God's Plan",
      artist: "Drake",
      album: "Scorpion",
      description: "A trap-influenced rap song with melodic vocals addressing fame and loyalty.",
      imageUrl: "https://images.unsplash.com/photo-1516968595849-0b17d9d25a88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop/Rap",
      year: 2018,
      rating: 4.5
    },
    // Rock songs
    {
      id: 1006,
      title: "High Hopes",
      artist: "Panic! at the Disco",
      album: "Pray for the Wicked",
      description: "An arena rock song with brass instrumentation and an uplifting message.",
      imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock",
      year: 2018,
      rating: 4.3
    },
    {
      id: 1007,
      title: "Believer",
      artist: "Imagine Dragons",
      album: "Evolve",
      description: "A hard rock and pop rock song with heavy percussion and introspective lyrics.",
      imageUrl: "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock",
      year: 2017,
      rating: 4.4
    },
    // Electronic/Dance songs
    {
      id: 1008,
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      description: "A nu-disco and dance-pop song influenced by 1970s and 1980s music.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Dance-Pop",
      year: 2019,
      rating: 4.6
    },
    {
      id: 1009,
      title: "Memories",
      artist: "David Guetta ft. Kid Cudi",
      album: "One Love",
      description: "An electro house song sampling Alphaville's 'Forever Young' with rap verses.",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Electronic",
      year: 2010,
      rating: 4.2
    },
    // R&B songs
    {
      id: 1010,
      title: "Earned It",
      artist: "The Weeknd",
      album: "Fifty Shades of Grey (Original Motion Picture Soundtrack)",
      description: "A slow R&B song with orchestral accompaniment and sensual lyrics.",
      imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "R&B",
      year: 2014,
      rating: 4.7
    },
    // Add more songs for variety
    {
      id: 1011,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      description: "A funk-pop, indie pop, and psychedelic pop song with summer vibes.",
      imageUrl: "https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop",
      year: 2019,
      rating: 4.4
    },
    {
      id: 1012,
      title: "WAP",
      artist: "Cardi B ft. Megan Thee Stallion",
      album: "Single",
      description: "A hip hop song with explicit lyrics about female sexuality.",
      imageUrl: "https://images.unsplash.com/photo-1437952407446-7e60a4078edf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop/Rap",
      year: 2020,
      rating: 4.1
    },
    // More songs by genre/mood
    {
      id: 1013,
      title: "Someone You Loved",
      artist: "Lewis Capaldi",
      album: "Divinely Uninspired to a Hellish Extent",
      description: "A piano ballad about heartbreak and loss that topped charts worldwide.",
      imageUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop",
      year: 2018,
      rating: 4.5
    },
    {
      id: 1014,
      title: "Dance Monkey",
      artist: "Tones and I",
      album: "The Kids Are Coming",
      description: "An electropop song about the pressures of performing as a street musician.",
      imageUrl: "https://images.unsplash.com/photo-1571399086895-02c7a28ee99c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Electropop",
      year: 2019,
      rating: 4.3
    },
    {
      id: 1015,
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      album: "Uptown Special",
      description: "A funk, soul, boogie, disco-pop, and R&B song with 1980s influences.",
      imageUrl: "https://images.unsplash.com/photo-1556379118-7034d926d258?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Funk/R&B",
      year: 2014,
      rating: 4.8
    }
  ];

  // Create a combined music array
  const allMusic = [...music, ...additionalSongs];

  // Create genre groupings for display
  const genres = ['Pop', 'Hip-Hop/Rap', 'Rock', 'R&B', 'Electronic', 'Dance-Pop'];
  const songsByGenre = genres.reduce((acc, genre) => {
    acc[genre] = allMusic.filter(song => song.genre && song.genre.includes(genre));
    return acc;
  }, {} as Record<string, ContentItemProps[]>);

  return (
    <div className="space-y-6">
      {/* Featured music section */}
      <GenreCarousel
        id="music-top-picks"
        title="Top Picks"
        subtitle="for you"
        items={allMusic.slice(0, 12)}
        gender={gender}
        onOpenDetails={onOpenDetails}
        onLike={onLike}
        likedContent={likedContent}
      />

      {/* Genre-based sections */}
      {genres.map((genre) => (
        <GenreCarousel
          key={genre}
          id={`genre-carousel-${genre.replace(/\s+/g, '-').toLowerCase()}`}
          title={genre}
          items={songsByGenre[genre] || []}
          gender={gender}
          onOpenDetails={onOpenDetails}
          onLike={onLike}
          likedContent={likedContent}
        />
      ))}

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

      {/* Mood-specific music */}
      <GenreCarousel
        id="mood-specific-music"
        title={`${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`}
        subtitle="Perfect for your current mood"
        items={allMusic.slice(5, 15)} 
        gender={gender}
        onOpenDetails={onOpenDetails}
        onLike={onLike}
        likedContent={likedContent}
      />

      {/* New Releases */}
      <GenreCarousel
        id="new-releases"
        title="New Releases"
        subtitle="Fresh music"
        items={allMusic.slice(8, 20)}
        gender={gender}
        onOpenDetails={onOpenDetails}
        onLike={onLike}
        likedContent={likedContent}
      />

      {/* Popular Playlists */}
      <GenreCarousel
        id="popular-playlists"
        title="Popular Playlists"
        subtitle="Trending now"
        items={allMusic.slice(3, 15)}
        gender={gender}
        onOpenDetails={onOpenDetails}
        onLike={onLike}
        likedContent={likedContent}
      />
    </div>
  );
};

export default MusicRecommendations;
