
import { ContentItemProps } from "@/components/ContentCard";
import { MoodType } from "@/components/MoodSelection";

// Sample data for recommendations based on mood
const happyMovies: ContentItemProps[] = [
  {
    id: 1,
    title: "Guardians of the Galaxy",
    description: "A group of intergalactic criminals must pull together to stop a fanatical warrior from taking control of the universe.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 8.0,
    platform: ["Netflix", "Disney+"],
    genre: "Action, Adventure, Comedy",
    year: 2014
  },
  {
    id: 2,
    title: "The Good Place",
    description: "Four people and their otherworldly frienemy struggle in the afterlife to define what it means to be good.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 8.2,
    platform: ["Netflix"],
    genre: "Comedy, Drama, Fantasy",
    year: 2016
  },
  {
    id: 3,
    title: "Ferris Bueller's Day Off",
    description: "A high school wise guy is determined to have a day off from school, despite what the Principal thinks.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    rating: 7.8,
    platform: ["Prime Video", "YouTube (Rent)"],
    genre: "Comedy",
    year: 1986
  },
  {
    id: 4,
    title: "Spider-Man: Into the Spider-Verse",
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    type: "movie",
    rating: 8.4,
    platform: ["Netflix", "Prime Video"],
    genre: "Animation, Action, Adventure",
    year: 2018
  },
  {
    id: 5,
    title: "Modern Family",
    description: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
    type: "movie",
    rating: 8.4,
    platform: ["Hulu", "Disney+"],
    genre: "Comedy, Drama, Romance",
    year: 2009
  }
];

const sadMovies: ContentItemProps[] = [
  {
    id: 11,
    title: "The Pursuit of Happyness",
    description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 8.0,
    platform: ["Netflix", "Prime Video"],
    genre: "Biography, Drama",
    year: 2006
  },
  {
    id: 12,
    title: "Soul",
    description: "A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    rating: 8.1,
    platform: ["Disney+"],
    genre: "Animation, Adventure, Comedy",
    year: 2020
  },
  {
    id: 13,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    type: "movie",
    rating: 9.3,
    platform: ["HBO Max", "Prime Video"],
    genre: "Drama",
    year: 1994
  },
  {
    id: 14,
    title: "A Beautiful Mind",
    description: "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.",
    type: "movie",
    rating: 8.2,
    platform: ["Netflix", "Prime Video"],
    genre: "Biography, Drama",
    year: 2001
  },
  {
    id: 15,
    title: "Good Will Hunting",
    description: "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
    type: "movie",
    rating: 8.3,
    platform: ["HBO Max", "Hulu"],
    genre: "Drama, Romance",
    year: 1997
  }
];

const neutralMovies: ContentItemProps[] = [
  {
    id: 21,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 8.8,
    platform: ["Netflix", "HBO Max"],
    genre: "Action, Adventure, Sci-Fi",
    year: 2010
  },
  {
    id: 22,
    title: "The Queen's Gambit",
    description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.",
    type: "movie",
    rating: 8.6,
    platform: ["Netflix"],
    genre: "Drama",
    year: 2020
  },
  {
    id: 23,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    type: "movie",
    rating: 8.7,
    platform: ["Netflix"],
    genre: "Drama, Fantasy, Horror",
    year: 2016
  },
  {
    id: 24,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    type: "movie",
    rating: 8.6,
    platform: ["Prime Video", "Netflix"],
    genre: "Adventure, Drama, Sci-Fi",
    year: 2014
  }
];

const confusedMovies: ContentItemProps[] = [
  {
    id: 31,
    title: "Donnie Darko",
    description: "After narrowly escaping a bizarre accident, a troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 8.0,
    platform: ["Hulu", "Prime Video"],
    genre: "Drama, Mystery, Sci-Fi",
    year: 2001
  },
  {
    id: 32,
    title: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 8.7,
    platform: ["HBO Max", "Netflix"],
    genre: "Action, Sci-Fi",
    year: 1999
  },
  {
    id: 33,
    title: "Annihilation",
    description: "A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don't apply.",
    type: "movie",
    rating: 6.8,
    platform: ["Netflix", "Prime Video"],
    genre: "Adventure, Drama, Horror",
    year: 2018
  },
  {
    id: 34,
    title: "Dark",
    description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    type: "movie",
    rating: 8.7,
    platform: ["Netflix"],
    genre: "Crime, Drama, Mystery",
    year: 2017
  },
  {
    id: 35,
    title: "Memento",
    description: "A man with short-term memory loss attempts to track down his wife's murderer.",
    type: "movie",
    rating: 8.4,
    platform: ["Prime Video", "Netflix"],
    genre: "Mystery, Thriller",
    year: 2000
  }
];

// Sample music data based on moods
const happyMusic: ContentItemProps[] = [
  {
    id: 101,
    title: "Happy",
    description: "A neo soul and funk song written for the film Despicable Me 2, it became a global hit for its positive message.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 4.5,
    genre: "Pop, Neo Soul",
    artist: "Pharrell Williams",
    album: "Girl"
  },
  {
    id: 102,
    title: "Don't Stop Me Now",
    description: "Energetic rock song with optimistic lyrics about having a good time, celebrating life, and facing challenges with a carefree attitude.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    rating: 4.8,
    genre: "Rock",
    artist: "Queen",
    album: "Jazz"
  },
  {
    id: 103,
    title: "Uptown Funk",
    description: "An upbeat funk-pop song with energetic rhythm, catchy hooks, and confident lyrics celebrating style and swagger.",
    type: "song",
    rating: 4.7,
    genre: "Funk, Pop",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special"
  },
  {
    id: 104,
    title: "Walking on Sunshine",
    description: "An upbeat 80s pop-rock song with bright instrumentation and joyful lyrics about being in love.",
    type: "song",
    rating: 4.2,
    genre: "Pop, Rock",
    artist: "Katrina & The Waves",
    album: "Walking on Sunshine"
  },
  {
    id: 105,
    title: "Can't Stop the Feeling!",
    description: "An upbeat disco-pop song with a positive message about joy and dancing.",
    type: "song",
    rating: 4.3,
    genre: "Pop, Disco",
    artist: "Justin Timberlake",
    album: "Trolls: Original Motion Picture Soundtrack"
  }
];

const sadMusic: ContentItemProps[] = [
  {
    id: 111,
    title: "Someone You Loved",
    description: "A piano-driven ballad about struggling to move on after a relationship has ended.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 4.6,
    genre: "Pop, Soul",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent"
  },
  {
    id: 112,
    title: "Fix You",
    description: "An emotional song about trying to help someone through difficult times.",
    type: "song",
    rating: 4.9,
    genre: "Alternative Rock",
    artist: "Coldplay",
    album: "X&Y"
  },
  {
    id: 113,
    title: "Hurt",
    description: "A poignant cover of Nine Inch Nails' song about regret and self-reflection, recorded toward the end of Cash's life.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 4.8,
    genre: "Folk, Country",
    artist: "Johnny Cash",
    album: "American IV: The Man Comes Around"
  },
  {
    id: 114,
    title: "Someone Like You",
    description: "A heartbreaking ballad about accepting the end of a relationship while still harboring feelings.",
    type: "song",
    rating: 4.7,
    genre: "Pop, Soul",
    artist: "Adele",
    album: "21"
  },
  {
    id: 115,
    title: "Everybody Hurts",
    description: "A comforting slow ballad reassuring listeners that everyone experiences pain and sadness.",
    type: "song",
    rating: 4.5,
    genre: "Alternative Rock",
    artist: "R.E.M.",
    album: "Automatic for the People"
  }
];

const neutralMusic: ContentItemProps[] = [
  {
    id: 121,
    title: "Bohemian Rhapsody",
    description: "A six-minute suite consisting of several sections without a chorus: an intro, a ballad segment, an operatic passage, a hard rock part and a reflective coda.",
    type: "song",
    rating: 4.9,
    genre: "Progressive Rock, Hard Rock",
    artist: "Queen",
    album: "A Night at the Opera"
  },
  {
    id: 122,
    title: "Hotel California",
    description: "A song about the excess, self-destruction, and dark side of the American dream, particularly in the context of 1970s California.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    rating: 4.8,
    genre: "Rock",
    artist: "Eagles",
    album: "Hotel California"
  },
  {
    id: 123,
    title: "Billie Jean",
    description: "A song about a woman who claims that the narrator is the father of her child, which he denies.",
    type: "song",
    rating: 4.8,
    genre: "Pop, Funk, R&B",
    artist: "Michael Jackson",
    album: "Thriller"
  },
  {
    id: 124,
    title: "Stairway to Heaven",
    description: "An epic song that gradually builds from a gentle acoustic beginning to a hard rock finale.",
    type: "song",
    rating: 4.9,
    genre: "Progressive Rock, Hard Rock",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV"
  }
];

const confusedMusic: ContentItemProps[] = [
  {
    id: 131,
    title: "Paranoid Android",
    description: "A multi-section song with abrupt changes in tempo, style, and mood, tackling themes of alienation, emotional disconnection, and political corruption.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    rating: 4.7,
    genre: "Alternative Rock, Art Rock",
    artist: "Radiohead",
    album: "OK Computer"
  },
  {
    id: 132,
    title: "Helter Skelter",
    description: "One of the earliest examples of heavy metal, created in response to The Who's claim of recording the 'dirtiest' song ever.",
    type: "song",
    rating: 4.6,
    genre: "Hard Rock, Proto-Metal",
    artist: "The Beatles",
    album: "The Beatles (White Album)"
  },
  {
    id: 133,
    title: "Lateralus",
    description: "A progressive metal song with complex time signatures and lyrics that reference the Fibonacci sequence.",
    type: "song",
    rating: 4.8,
    genre: "Progressive Metal",
    artist: "Tool",
    album: "Lateralus"
  },
  {
    id: 134,
    title: "Bohemian Rhapsody",
    description: "A six-minute suite consisting of several sections without a chorus: an intro, a ballad segment, an operatic passage, a hard rock part and a reflective coda.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 4.9,
    genre: "Progressive Rock, Hard Rock",
    artist: "Queen",
    album: "A Night at the Opera"
  },
  {
    id: 135,
    title: "Black Hole Sun",
    description: "A psychedelic rock song with surreal lyrics and shifting moods, ranging from melancholic verses to an intense chorus.",
    type: "song",
    rating: 4.7,
    genre: "Grunge, Alternative Rock",
    artist: "Soundgarden",
    album: "Superunknown"
  }
];

export const getRecommendedContent = (mood: MoodType): ContentItemProps[] => {
  switch (mood) {
    case 'happy':
      return [...happyMovies, ...happyMusic];
    case 'sad':
      return [...sadMovies, ...sadMusic];
    case 'neutral':
      return [...neutralMovies, ...neutralMusic];
    case 'confused':
      return [...confusedMovies, ...confusedMusic];
    default:
      // Return a mix of all if mood is not selected or null
      return [
        ...happyMovies.slice(0, 2),
        ...sadMovies.slice(0, 2),
        ...neutralMovies.slice(0, 2),
        ...confusedMovies.slice(0, 2),
        ...happyMusic.slice(0, 2),
        ...sadMusic.slice(0, 2),
        ...neutralMusic.slice(0, 1),
        ...confusedMusic.slice(0, 1),
      ];
  }
};
