
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

  // Expanded song collection with ~50 total songs
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
    // Adding a bunch of new songs (40+ more)
    {
      id: 1020,
      title: "Circles",
      artist: "Post Malone",
      album: "Hollywood's Bleeding",
      description: "A mellow pop-rock song with elements of psychedelic and alternative rock.",
      imageUrl: "https://images.unsplash.com/photo-1593698054589-8c14bb66d2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 2019,
      rating: 4.3
    },
    {
      id: 1021,
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      description: "A nu-disco and dance-pop track with elements of funk.",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Dance-Pop",
      year: 2019,
      rating: 4.6
    },
    {
      id: 1022,
      title: "Levitating",
      artist: "Dua Lipa ft. DaBaby",
      album: "Future Nostalgia",
      description: "A disco-influenced dance-pop song with a futuristic vibe.",
      imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Dance-Pop",
      year: 2020,
      rating: 4.7
    },
    {
      id: 1023,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      description: "A funky rock and pop song with summer vibes.",
      imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 2019,
      rating: 4.4
    },
    {
      id: 1024,
      title: "positions",
      artist: "Ariana Grande",
      album: "Positions",
      description: "A trap-pop and R&B song with orchestral elements.",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/R&B",
      year: 2020,
      rating: 4.2
    },
    {
      id: 1025,
      title: "Mood",
      artist: "24kGoldn ft. iann dior",
      album: "El Dorado",
      description: "A pop-rap and alternative rock song about a complicated relationship.",
      imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Hip-Hop",
      year: 2020,
      rating: 4.3
    },
    {
      id: 1026,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      description: "A pop and hip hop-influenced song with electronic production.",
      imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop",
      year: 2021,
      rating: 4.4
    },
    {
      id: 1027,
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      description: "A pop punk and pop rock song with angsty lyrics.",
      imageUrl: "https://images.unsplash.com/photo-1619983000333-191c861c198e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 2021,
      rating: 4.6
    },
    {
      id: 1028,
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      album: "Montero",
      description: "A hip hop and pop rap song with elements of Latin pop.",
      imageUrl: "https://images.unsplash.com/photo-1460723237783-e82e7736d5e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop/Pop",
      year: 2021,
      rating: 4.5
    },
    {
      id: 1029,
      title: "Peaches",
      artist: "Justin Bieber ft. Daniel Caesar & Giveon",
      album: "Justice",
      description: "An R&B and pop song with soulful vocals.",
      imageUrl: "https://images.unsplash.com/photo-1620578592053-e45cea5be218?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "R&B/Pop",
      year: 2021,
      rating: 4.2
    },
    {
      id: 1030,
      title: "Kiss Me More",
      artist: "Doja Cat ft. SZA",
      album: "Planet Her",
      description: "A disco-influenced pop and R&B song.",
      imageUrl: "https://images.unsplash.com/photo-1493422884938-abd42cfa0f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/R&B",
      year: 2021,
      rating: 4.7
    },
    {
      id: 1031,
      title: "Save Your Tears",
      artist: "The Weeknd & Ariana Grande",
      album: "After Hours (Remix)",
      description: "A synth-pop and new wave song with 1980s influences.",
      imageUrl: "https://images.unsplash.com/photo-1599467556385-5e179495cedf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/R&B",
      year: 2021,
      rating: 4.8
    },
    {
      id: 1032,
      title: "drivers license",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      description: "A power ballad with pop and indie pop elements.",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop",
      year: 2021,
      rating: 4.9
    },
    {
      id: 1033,
      title: "Butter",
      artist: "BTS",
      album: "Butter",
      description: "A dance-pop song with elements of disco and funk.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "K-Pop/Dance",
      year: 2021,
      rating: 4.5
    },
    {
      id: 1034,
      title: "Industry Baby",
      artist: "Lil Nas X ft. Jack Harlow",
      album: "Montero",
      description: "A hip-hop song with brassy production and triumphant lyrics.",
      imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop",
      year: 2021,
      rating: 4.6
    },
    {
      id: 1035,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      description: "A psychedelic pop and indie pop song with electronic elements.",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Indie Pop",
      year: 2020,
      rating: 4.7
    },
    {
      id: 1036,
      title: "Dynamite",
      artist: "BTS",
      album: "BE",
      description: "A disco-pop song sung entirely in English.",
      imageUrl: "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "K-Pop/Disco",
      year: 2020,
      rating: 4.5
    },
    {
      id: 1037,
      title: "Leave The Door Open",
      artist: "Silk Sonic (Bruno Mars & Anderson .Paak)",
      album: "An Evening with Silk Sonic",
      description: "A soulful R&B song inspired by 1970s soul music.",
      imageUrl: "https://images.unsplash.com/photo-1619961602309-11ac066bede3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "R&B/Soul",
      year: 2021,
      rating: 4.9
    },
    {
      id: 1038,
      title: "Happier Than Ever",
      artist: "Billie Eilish",
      album: "Happier Than Ever",
      description: "A song that transforms from a soft ballad to an intense rock climax.",
      imageUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Alternative/Rock",
      year: 2021,
      rating: 4.8
    },
    {
      id: 1039,
      title: "Deja Vu",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      description: "A pop rock and psychedelic rock song about a past relationship.",
      imageUrl: "https://images.unsplash.com/photo-1617440168937-c6497a7b2b22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 2021,
      rating: 4.5
    },
    {
      id: 1040,
      title: "Astronaut In The Ocean",
      artist: "Masked Wolf",
      album: "Astronomical",
      description: "A rap song with trap production about mental health struggles.",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Hip-Hop/Rap",
      year: 2019,
      rating: 4.1
    },
    {
      id: 1041,
      title: "Without You",
      artist: "The Kid LAROI",
      album: "F*CK LOVE",
      description: "An emotional pop and alternative rock song about heartbreak.",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 2020,
      rating: 4.3
    },
    {
      id: 1042,
      title: "Jolene",
      artist: "Dolly Parton",
      album: "Jolene",
      description: "A classic country song about a woman pleading with another not to take her man.",
      imageUrl: "https://images.unsplash.com/photo-1581281863883-2469417a1668?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Country",
      year: 1973,
      rating: 4.9
    },
    {
      id: 1043,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      description: "A hard rock song featuring one of the most recognizable guitar riffs in rock history.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock",
      year: 1987,
      rating: 4.9
    },
    {
      id: 1044,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      description: "A six-minute suite consisting of several sections without a chorus.",
      imageUrl: "https://images.unsplash.com/photo-1583265627959-fb7042f5133b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock",
      year: 1975,
      rating: 5.0
    },
    {
      id: 1045,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      description: "A grunge anthem that helped bring alternative rock to the mainstream.",
      imageUrl: "https://images.unsplash.com/photo-1526394931762-8a4116f6e831?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Grunge/Rock",
      year: 1991,
      rating: 4.9
    },
    {
      id: 1046,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      description: "A dance-pop and post-disco song with a distinctive bassline.",
      imageUrl: "https://images.unsplash.com/photo-1461784180009-27c1303a64b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/R&B",
      year: 1982,
      rating: 4.9
    },
    {
      id: 1047,
      title: "Yesterday",
      artist: "The Beatles",
      album: "Help!",
      description: "A melancholy ballad about lost love with string accompaniment.",
      imageUrl: "https://images.unsplash.com/photo-1597169428801-7c1adf2a521e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Pop/Rock",
      year: 1965,
      rating: 4.8
    },
    {
      id: 1048,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      description: "A piano ballad encouraging listeners to imagine a world of peace.",
      imageUrl: "https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock",
      year: 1971,
      rating: 4.9
    },
    {
      id: 1049,
      title: "Respect",
      artist: "Aretha Franklin",
      album: "I Never Loved a Man the Way I Love You",
      description: "A soul anthem that became a symbol for the feminist movement.",
      imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Soul/R&B",
      year: 1967,
      rating: 4.8
    },
    {
      id: 1050,
      title: "Like a Rolling Stone",
      artist: "Bob Dylan",
      album: "Highway 61 Revisited",
      description: "A folk rock song with poetic, confrontational lyrics.",
      imageUrl: "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Folk/Rock",
      year: 1965,
      rating: 4.9
    },
    {
      id: 1051,
      title: "Purple Haze",
      artist: "Jimi Hendrix",
      album: "Are You Experienced",
      description: "A psychedelic rock song with innovative guitar techniques.",
      imageUrl: "https://images.unsplash.com/photo-1567013275689-c179a874478f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Psychedelic Rock",
      year: 1967,
      rating: 4.8
    },
    {
      id: 1052,
      title: "Johnny B. Goode",
      artist: "Chuck Berry",
      album: "Chuck Berry Is on Top",
      description: "An early rock and roll song with influential guitar work.",
      imageUrl: "https://images.unsplash.com/photo-1516916759473-600c07bc12d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "song",
      genre: "Rock and Roll",
      year: 1958,
      rating: 4.7
    }
  ];

  // Create a combined music array
  const allMusic = [...music, ...additionalSongs];

  // Create genre groupings for display
  const genres = ['Pop', 'Hip-Hop/Rap', 'Rock', 'R&B', 'Electronic', 'Country', 'Dance-Pop', 'K-Pop'];
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
      {genres.map((genre) => 
        songsByGenre[genre]?.length > 0 && (
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
        )
      )}

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
        items={allMusic.slice(20, 32)}
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
        items={allMusic.slice(32, 44)}
        gender={gender}
        onOpenDetails={onOpenDetails}
        onLike={onLike}
        likedContent={likedContent}
      />
    </div>
  );
};

export default MusicRecommendations;
