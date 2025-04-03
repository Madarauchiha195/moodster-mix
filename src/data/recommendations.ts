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
  },
  {
    id: 6,
    title: "The Lego Movie",
    description: "An ordinary LEGO construction worker is recruited to join a quest to stop an evil tyrant from gluing the LEGO universe into eternal stasis.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 7.7,
    platform: ["HBO Max", "Prime Video"],
    genre: "Animation, Action, Adventure",
    year: 2014
  },
  {
    id: 7,
    title: "School of Rock",
    description: "After being kicked out of his rock band, Dewey Finn becomes a substitute teacher of an uptight elementary private school, only to try and turn his class into a rock band.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 7.1,
    platform: ["Netflix", "Prime Video"],
    genre: "Comedy, Music",
    year: 2003
  },
  {
    id: 8,
    title: "Dumb and Dumber",
    description: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
    type: "movie",
    rating: 7.3,
    platform: ["HBO Max"],
    genre: "Comedy",
    year: 1994
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
  },
  {
    id: 16,
    title: "Eternal Sunshine of the Spotless Mind",
    description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 8.3,
    platform: ["Prime Video", "Hulu"],
    genre: "Drama, Romance, Sci-Fi",
    year: 2004
  },
  {
    id: 17,
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 9.0,
    platform: ["Netflix"],
    genre: "Biography, Drama, History",
    year: 1993
  },
  {
    id: 18,
    title: "Manchester by the Sea",
    description: "A depressed uncle is asked to take care of his teenage nephew after the boy's father dies.",
    type: "movie",
    rating: 7.8,
    platform: ["Prime Video"],
    genre: "Drama",
    year: 2016
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
  },
  {
    id: 25,
    title: "The Prestige",
    description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 8.5,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, Mystery, Sci-Fi",
    year: 2006
  },
  {
    id: 26,
    title: "The Social Network",
    description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 7.8,
    platform: ["Netflix"],
    genre: "Biography, Drama",
    year: 2010
  },
  {
    id: 27,
    title: "Arrival",
    description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    type: "movie",
    rating: 7.9,
    platform: ["Hulu", "Prime Video"],
    genre: "Drama, Mystery, Sci-Fi",
    year: 2016
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
  },
  {
    id: 36,
    title: "Primer",
    description: "Four friends/fledgling entrepreneurs, knowing that there's something bigger and more innovative than the different error-checking devices they've built, wrestle over their new invention.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 6.9,
    platform: ["Prime Video"],
    genre: "Drama, Sci-Fi, Thriller",
    year: 2004
  },
  {
    id: 37,
    title: "Mulholland Drive",
    description: "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 7.9,
    platform: ["HBO Max"],
    genre: "Drama, Mystery, Thriller",
    year: 2001
  },
  {
    id: 38,
    title: "The Fountain",
    description: "As a modern-day scientist, Tommy is struggling with mortality, desperately searching for the medical breakthrough that will save the life of his cancer-stricken wife, Izzi.",
    type: "movie",
    rating: 7.2,
    platform: ["Hulu"],
    genre: "Drama, Mystery, Romance",
    year: 2006
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
  },
  {
    id: 106,
    title: "Good Vibrations",
    description: "The Beach Boys' masterpiece, featuring innovative use of instruments and recording techniques. Known for its uplifting, positive message.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 4.9,
    genre: "Rock, Pop",
    artist: "The Beach Boys",
    album: "Smiley Smile"
  },
  {
    id: 107,
    title: "Blinding Lights",
    description: "A synthwave and '80s-inspired track that combines retro sounds with modern production.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 4.6,
    genre: "Synth-pop, New Wave",
    artist: "The Weeknd",
    album: "After Hours"
  },
  {
    id: 108,
    title: "Levitating",
    description: "A disco-pop song with a retro dance sound inspired by 1970s and 1980s club culture.",
    type: "song",
    rating: 4.4,
    genre: "Pop, Disco",
    artist: "Dua Lipa",
    album: "Future Nostalgia"
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
  },
  {
    id: 116,
    title: "Nothing Compares 2 U",
    description: "A powerful song about loss and longing, made famous by Sinéad O'Connor's emotional performance.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 4.6,
    genre: "Pop, Soul, Rock",
    artist: "Sinéad O'Connor",
    album: "I Do Not Want What I Haven't Got"
  },
  {
    id: 117,
    title: "Tears In Heaven",
    description: "Written after the death of Clapton's four-year-old son, this emotional ballad explores grief and loss.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 4.8,
    genre: "Rock, Pop",
    artist: "Eric Clapton",
    album: "Unplugged"
  },
  {
    id: 118,
    title: "Hey Jude",
    description: "Originally written by Paul McCartney to comfort John Lennon's son during his parents' divorce.",
    type: "song",
    rating: 4.9,
    genre: "Rock, Pop",
    artist: "The Beatles",
    album: "The Beatles 1967-1970"
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
  },
  {
    id: 125,
    title: "Smells Like Teen Spirit",
    description: "A groundbreaking grunge anthem that became an unexpected mainstream hit, capturing youth angst and rebellion.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 4.8,
    genre: "Grunge, Alternative Rock",
    artist: "Nirvana",
    album: "Nevermind"
  },
  {
    id: 126,
    title: "Smooth",
    description: "A Latin rock hit that combines Carlos Santana's guitar work with Rob Thomas's vocals.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    rating: 4.3,
    genre: "Latin Rock, Pop Rock",
    artist: "Santana ft. Rob Thomas",
    album: "Supernatural"
  },
  {
    id: 127,
    title: "Imagine",
    description: "A piano ballad with lyrics encouraging listeners to imagine a world of peace.",
    type: "song",
    rating: 4.9,
    genre: "Soft Rock, Pop",
    artist: "John Lennon",
    album: "Imagine"
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
  },
  {
    id: 136,
    title: "Revolution 9",
    description: "An avant-garde sound collage created using tape loops, sound effects, and snippets of conversation.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    rating: 3.2,
    genre: "Experimental, Avant-garde",
    artist: "The Beatles",
    album: "The Beatles (White Album)"
  },
  {
    id: 137,
    title: "Echoes",
    description: "A 23-minute progressive rock composition featuring ambient sections, sound effects, and philosophical lyrics.",
    type: "song",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rating: 4.9,
    genre: "Progressive Rock, Psychedelic",
    artist: "Pink Floyd",
    album: "Meddle"
  },
  {
    id: 138,
    title: "Spem in Alium",
    description: "A Renaissance motet written for 40 independent voices, creating complex harmonies and textures.",
    type: "song",
    rating: 4.8,
    genre: "Classical, Renaissance",
    artist: "Thomas Tallis",
    album: "The Tallis Scholars Sing Thomas Tallis"
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
