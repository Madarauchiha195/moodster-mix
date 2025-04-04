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
  },
  // Adding more happy movies (40+ total)
  {
    id: 9,
    title: "Toy Story",
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a",
    rating: 8.3,
    platform: ["Disney+"],
    genre: "Animation, Adventure, Comedy",
    year: 1995
  },
  {
    id: 10,
    title: "Coco",
    description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1604531268683-c732502f2928",
    rating: 8.4,
    platform: ["Disney+"],
    genre: "Animation, Adventure, Family",
    year: 2017
  },
  {
    id: 41,
    title: "Bridesmaids",
    description: "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1533654793924-4fc4949fb71e",
    rating: 6.8,
    platform: ["Prime Video", "HBO Max"],
    genre: "Comedy, Romance",
    year: 2011
  },
  {
    id: 42,
    title: "Inside Out",
    description: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1616627561950-9f746e330187",
    rating: 8.1,
    platform: ["Disney+"],
    genre: "Animation, Adventure, Comedy",
    year: 2015
  },
  {
    id: 43,
    title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
    rating: 8.0,
    platform: ["Netflix", "Prime Video"],
    genre: "Comedy, Drama, Music",
    year: 2016
  },
  {
    id: 44,
    title: "The Princess Bride",
    description: "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7",
    rating: 8.0,
    platform: ["Disney+", "Prime Video"],
    genre: "Adventure, Family, Fantasy",
    year: 1987
  },
  {
    id: 45,
    title: "Finding Nemo",
    description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    rating: 8.1,
    platform: ["Disney+"],
    genre: "Animation, Adventure, Comedy",
    year: 2003
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
  },
  // Adding more sad movies
  {
    id: 19,
    title: "Life Is Beautiful",
    description: "When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1500259571355-332da5cb07aa",
    rating: 8.6,
    platform: ["Netflix", "Prime Video"],
    genre: "Comedy, Drama, Romance",
    year: 1997
  },
  {
    id: 20,
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    rating: 8.6,
    platform: ["Netflix", "HBO Max"],
    genre: "Crime, Drama, Fantasy",
    year: 1999
  },
  {
    id: 46,
    title: "The Boy in the Striped Pajamas",
    description: "Through the innocent eyes of Bruno, the eight-year-old son of the commandant at a German concentration camp, a forbidden friendship with a Jewish boy on the other side of the camp fence has startling and unexpected consequences.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    rating: 7.8,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, War",
    year: 2008
  },
  {
    id: 47,
    title: "Requiem for a Dream",
    description: "The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1534531173927-aeb928d54385",
    rating: 8.3,
    platform: ["HBO Max", "Prime Video"],
    genre: "Drama",
    year: 2000
  },
  {
    id: 48,
    title: "Grave of the Fireflies",
    description: "A young boy and his little sister struggle to survive in Japan during World War II.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a",
    rating: 8.5,
    platform: ["Netflix"],
    genre: "Animation, Drama, War",
    year: 1988
  },
  {
    id: 49,
    title: "Room",
    description: "Held captive for 7 years in an enclosed space, a woman and her young son finally gain their freedom, allowing the boy to experience the outside world for the first time.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    rating: 8.1,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, Thriller",
    year: 2015
  },
  {
    id: 50,
    title: "Marriage Story",
    description: "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    rating: 7.9,
    platform: ["Netflix"],
    genre: "Comedy, Drama, Romance",
    year: 2019
  },
  {
    id: 51,
    title: "Me Before You",
    description: "A girl in a small town forms an unlikely bond with a recently-paralyzed man she's taking care of.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1551311089-6f11907c8ece",
    rating: 7.4,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, Romance",
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
  },
  // Adding more neutral movies
  {
    id: 28,
    title: "The Truman Show",
    description: "An insurance salesman discovers his whole life is actually a reality TV show.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    rating: 8.1,
    platform: ["Netflix", "Prime Video"],
    genre: "Comedy, Drama, Sci-Fi",
    year: 1998
  },
  {
    id: 29,
    title: "The Grand Budapest Hotel",
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1561501900-3701fa6a0864",
    rating: 8.1,
    platform: ["Prime Video", "Hulu"],
    genre: "Adventure, Comedy, Crime",
    year: 2014
  },
  {
    id: 52,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1564417947365-8dbc9d0e814a",
    rating: 8.5,
    platform: ["Hulu", "Prime Video"],
    genre: "Comedy, Drama, Thriller",
    year: 2019
  },
  {
    id: 53,
    title: "Whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7",
    rating: 8.5,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, Music",
    year: 2014
  },
  {
    id: 54,
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1543365067-fa127bcb2303",
    rating: 8.8,
    platform: ["Hulu", "Prime Video"],
    genre: "Drama",
    year: 1999
  },
  {
    id: 55,
    title: "Shutter Island",
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1543039717-b2d36a3cc605",
    rating: 8.2,
    platform: ["Netflix", "Prime Video"],
    genre: "Mystery, Thriller",
    year: 2010
  },
  {
    id: 56,
    title: "The Departed",
    description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1553413077-190c0d3a2858",
    rating: 8.5,
    platform: ["Netflix", "HBO Max"],
    genre: "Crime, Drama, Thriller",
    year: 2006
  },
  {
    id: 57,
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1551838030-f478473c9f0d",
    rating: 8.8,
    platform: ["Netflix", "Prime Video"],
    genre: "Drama, Romance",
    year: 1994
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
  },
  // Adding more confused movies
  {
    id: 39,
    title: "Coherence",
    description: "Strange things begin to happen when a group of friends gather for a dinner party on an evening when a comet is passing overhead.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1518544866330-33c2beff5356",
    rating: 7.2,
    platform: ["Prime Video"],
    genre: "Mystery, Sci-Fi, Thriller",
    year: 2013
  },
  {
    id: 40,
    title: "Cloud Atlas",
    description: "An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    rating: 7.4,
    platform: ["Netflix", "Prime Video"],
    genre: "Action, Drama, Mystery",
    year: 2012
  },
  {
    id: 58,
    title: "Vanilla Sky",
    description: "A self-indulgent and vain publishing magnate finds his privileged life upended after a vehicular accident with a resentful lover.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e",
    rating: 6.9,
    platform: ["Prime Video", "Netflix"],
    genre: "Fantasy, Mystery, Romance",
    year: 2001
  },
  {
    id: 59,
    title: "Enemy",
    description: "A man seeks out his exact look-alike after spotting him in a movie.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1589129140837-67287c22521b",
    rating: 6.9,
    platform: ["Netflix"],
    genre: "Mystery, Thriller",
    year: 2013
  },
  {
    id: 60,
    title: "The Machinist",
    description: "An industrial worker who hasn't slept in a year begins to doubt his own sanity.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    rating: 7.6,
    platform: ["Prime Video", "Hulu"],
    genre: "Drama, Thriller",
    year: 2004
  },
  {
    id: 61,
    title: "Black Swan",
    description: "A committed dancer struggles to maintain her sanity after winning the lead role in a production of Tchaikovsky's 'Swan Lake'.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
    rating: 8.0,
    platform: ["Prime Video", "Hulu"],
    genre: "Drama, Thriller",
    year: 2010
  },
  {
    id: 62,
    title: "The Lighthouse",
    description: "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1551361999-b9c0d0b93f34",
    rating: 7.5,
    platform: ["Prime Video"],
